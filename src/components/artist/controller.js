const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')
const artistModel = require('../../store/models/artist')


const getAllArtist = async() => {
    try {
      const artists = await store.get()
      return artists  
    } catch (error) {
        throw new Error(error)
    }
}

const getArtist = async(id) => {
    try {
        const artist = await store.getFilter(id)
        return artist
    } catch (error) {
        throw new Error(error)
    }
}

const createArtist = async (name, email, password, country, record,  image) => {
    try {
        if (!name || !email || !password || !record || !country  ){
            throw new Error("Missing Data")
        }

        let fileUrl = ""
            if (image){
                fileUrl = `http://localhost:${config.port}/app/files/${image.filename}`
            }

        const hashedPassword = await bcrypt.hash(password, 8)

        const artist =  {
            name,
            email,
            password: hashedPassword,
            country,
            record,
            image: fileUrl, 
        }

        const newArtist = await store.add(artist)

        const finalResponse = {
            newArtist,
            "System": "Artist succesfully created"
        }

        return finalResponse

    } catch (error) {
        throw new Error(error)
    }
}

const updateArtist = async(name, email, password, country, record,image, id) => {
    try {
        if (!name || !email || !password || !record || !country ){
            throw new Error("Missing Data")
        }

        let fileUrl = ""
        if (image){
            fileUrl = `http://localhost:${config.port}/app/files/${image.filename}`
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const artist =  {
            name,
            email,
            password: hashedPassword,
            country,
            record,
            image: fileUrl, 
        }

        const updatedArtist = await store.update(id, artist)

        const finalResponse = {
            artist,
            "System": "Artist succesfully Updated"
        }

        return finalResponse

    } catch (error) {
     throw new Error(error)   
    }
}

const deleteArtist = async(id) => {
    try {
        const artist = await store.remove(id)

        return finalResponse = {
            artist,
            "System": "Artist succesfully deleted"
        }
    } catch (error) {
        throw new Error(error)
    }
}

const passwordRecover = async(email, header) => {
    try {
        if(!email){ throw new Error("Missing data")}

        const user = await artistModel.find({email: email})

        if(!user){ throw new Error("User not found")}


        user[0].resetPasswordToken = crypto.randomBytes(20).toString('hex')
        

        user[0].save()
            
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "cdaymusicapp20202@gmail.com",
                pass: config.password_email
            }
        })
        let link = `http://${header}/auth/reset/${user[0].resetPasswordToken}`
        let mailOptions = {
            from: 'gonzalezomar645@gmail.com',
            to: user[0].email,
            subject: "Password Reset",
            text: `Hi ${user[0].name} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,

        }

        let response = ""
        transporter.sendMail(mailOptions, function(error) {
            if(error){
                throw new Error(error)
            }
            
            console.log('mail sent');
            response =  'An e-mail has been sent to ' + user[0].email + ' with further instructions.'
            return response
        });
        return response


    } catch (error) {
        throw new Error(error)
    }

}

const reset = async(token, password) => {
    try {
        
        const user = await artistModel.find({resetPasswordToken: token})
        console.log(user)

        if(!user){ throw new Error("User not found")}
        
        const hashedPassword = await bcrypt.hash(password, 8)

        user[0].password = hashedPassword
        user[0].resetPasswordToken = undefined

        user[0].save()

        const response ={ System: "password succesfully change"}
        return response
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAllArtist,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist,
    passwordRecover,
    reset

}