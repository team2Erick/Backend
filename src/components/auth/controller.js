const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const userModel = require('../../store/models/user')


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


const addExtraInfo = async(age, country, gender, image , id) => {
    try {
       if(!age || !country || !gender ){
           throw new Error("Missing Date")
       } 

       let fileUrl = ""
       if (image){
           fileUrl = `http://localhost:${config.port}/app/files/${image.filename}`
           
           const userImage = {
            age,
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
           age,
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


const passwordRecover = async(email, header) => {
    try {
        if(!email){ throw new Error("Missing data")}

        const user = await userModel.find({email: email})

        if(!user){ throw new Error("User not found")}


        user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
        user.resetPasswordExpires = Date.now() + 3600000

        userModel.update()
        console.log(user)
            
        let transporter = nodemailer.createTransport({
            service: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4a157897ed06dd",
                pass: "1f4af3a2ab5d98"
            }
        })
        let link = `http://${header}/auth/reset/${user.resetPasswordToken}`
        let mailOptions = {
            to: user.email,
            from: 'gonzalezomar645@gmail.com',
            text: `Hi ${user.username} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,

        }

    
        transporter.sendMail(mailOptions, function(error) {
            if(error){
                throw new Error(error)
            }
            
            console.log('mail sent');
            let response =  'An e-mail has been sent to ' + user.email + ' with further instructions.'
            
          });


    } catch (error) {
        throw new Error(error)
    }

}

const reset = async(token, password) => {
    try {
        const user = await userModel.find({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}})

        if(!user){ throw new Error("User not found")}

        const hashedPassword = await bcrypt.hash(password, 8)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        userModel.update()

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