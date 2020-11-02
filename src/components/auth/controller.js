const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const userModel = require('../../store/models/user')
const jwt = require('jsonwebtoken')


const getUser = async(filter) => {
    const user = await store.get(filter)
    return user
}

const getUserById = async(id) => {
    const user = await store.getById(id)
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


const addExtraInfo = async(birthdate, country, gender, image , id, header, protocol) => {
    try {
       if(!birthdate || !country || !gender ){
           throw new Error("Missing Date")
       } 

       let fileUrl = ""
       if (image){
           fileUrl = `${protocol}://${header}/public/files/${image.filename}`
           
           const userImage = {
            birthdate,
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
           birthdate,
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
            html: `Hi <strong> ${user[0].name} </strong> \n 
            <div align="center">
                <img src="../../assets/images/cday_2.jpg" alt="LogoCDAY" width="20%">
            </div>
            <p style="font-size:150%; text-align: center;">
                Please click on the following link to reset your password. \n\n 
                If you did not request this, please ignore this email and your password will remain unchanged.
            </p>
            <p style="text-align:center; font-size:110%;">
                <strong ">Link</strong><br>                        
            </p>
            <p style="color: #fff; font-size: 18px; font-weight: 400; text-align: center; background: #005ba3; margin: 0 0 25px; overflow: hidden; padding: 20px; border-radius: 35px 35px 35px 35px; 
            -moz-border-radius: 35px 35px 35px 35px; -webkit-border-radius: 35px 35px 35px 35px; border: 2px solid #743D40;"> ${link} </p> \n`

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

const createToken = async(user) => {
    try {

        // console.log(user)

        const { _id: id, name, email , image, gender, country, birthdate} = user[0];
                        
            const payload = {
                sub: id,
                name,
                email,
                image,
                birthdate,
                gender,
                country
            }

        
        const token = jwt.sign(payload, config.jwt_key,{
            expiresIn: '30m'
        })

        return token 

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getUserById,
    getUser,
    createUser,
    addExtraInfo,
    passwordRecover,
    reset,
    createToken
}