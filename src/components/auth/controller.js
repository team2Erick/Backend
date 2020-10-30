const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const userModel = require('../../store/models/user')
const artistModel = require('../../store/models/artist')
const { throws } = require('assert')


const getUser = async(filter) => {
    const user = await store.get(filter)
    return user
}

const createUser = async (name, email, password, image) => {
    if(!name || !email || !password){
        throw new Error("Missing Data")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = {
        name,
        email,
        password: hashedPassword,
        image
    }
    

    const newUser = await store.add(user)
    return newUser
    
}


const addExtraInfo = async(brithdate, country, gender, image , id, header, protocol) => {
    try {
       if(!brithdate || !country || !gender ){
           throw new Error("Missing Date")
       } 

       let fileUrl = ""
       if (image){
           fileUrl = `${protocol}://${header}:${config.port}/app/files/${image.filename}`
           
           const userImage = {
            brithdate,
            country,
            gender,
            image: fileUrl
        }

        
        const data2 = await store.addExtraInfo(userImage, id)

        const finalResponse2 = {
            data2,
            "System Message": "Register Complete"
        }
 
        return finalResponse2
       }

       
       const user = {
           brithdate,
           country,
           gender,
       }


       const data = await store.addExtraInfo(user, id)

       const finalResponse = {
           data,
           "System Message": "Register Complete"
       }

       return finalResponse

    } catch (error) {
        throw new Error(error)
    }
}


const passwordRecover = async(email, header, protocol) => {
    try {
        if(!email){ throw new Error("Missing data")}
        const user = await userModel.find({email: email})
        console.log(header)

        if(!user){ throw new Error("User not found")}


        user[0].PasswordToken = crypto.randomBytes(20).toString('hex')
        

        user[0].save()
            
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "cdaymusicapp20202@gmail.com",
                pass: config.password_email
            }
        })
        let link = `${protocol}://${header}/api/auth/reset/${user[0].PasswordToken}`
        let mailOptions = {
            from: 'gonzalezomar645@gmail.com',
            to: user[0].email,
            subject: "Password Reset",
            text: `Hi ${user[0].name} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,

        }

        
        transporter.sendMail(mailOptions, (error, result) => {
            if(error){
                throw new Error (error)
            }

            console.log("mail sent")
        })
           
        


    } catch (error) {
        throw new Error(error)
    }

}

const reset = async(token, password) => {
    try {
        
        const user = await userModel.find({PasswordToken: token})
        

        if(!user){ throw new Error("User not found")}
        
        const hashedPassword = await bcrypt.hash(password, 8)

        user[0].password = hashedPassword
        user[0].PasswordToken = undefined

        user[0].save()

        const response ={ System: "password succesfully change"}
        return response
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getUser,
    createUser,
    addExtraInfo,
    passwordRecover,
    reset
}