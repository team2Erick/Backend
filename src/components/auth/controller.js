const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')

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

module.exports = {
    getUser,
    createUser,
    addExtraInfo
    
}