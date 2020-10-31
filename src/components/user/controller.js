const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')
const Model = require('./store')

const getAllUsers = async() => {
    try {
      const users = await store.get()
      return users  
    } catch (error) {
        throw new Error(error)
    }
}

const getUser = async(id) => {
    try {
        const user = await store.getFilter(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

const createUser = async (name, email, password, birthdate, country, gender ,image, header, protocol) => {
    try {
        if (!name || !email || !password || !birthdate || !country || !gender){
            throw new Error("Missing Data")
        }
        
        const email = Model.
        
        let fileUrl = ""
        if (image){
            fileUrl = `${protocol}://${header}/app/public/files/${image.filename}`
        }

        
        const hashedPassword = await bcrypt.hash(password, 8)

        const user =  {
            name,
            email,
            image: fileUrl,
            birthdate,
            country,
            password: hashedPassword
        }

        const newUser = await store.add(user)

        const finalResponse = {
            newUser,
            "System": "User succesfully created"
        }

        return finalResponse

    } catch (error) {
        throw new Error(error)
    }
}

const updateUser = async(name, email, password, birthdate, country, gender ,image ,id, header, protocol) => {
    try {
        if (!name || !email || !password || !birthdate || !country || !gender){
            throw new Error("Missing Data")
        }

        let fileUrl = ""
        if (image){
            fileUrl = `${protocol}://${header}/app/files/${image.filename}`
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user =  {
            name,
            email,
            image: fileUrl,
            birthdate,
            country,
            password: hashedPassword
        }

        const updatedUser = await store.update(id, user)

        const finalResponse = {
            updatedUser,
            "System": "User succesfully Updated"
        }

        return finalResponse

    } catch (error) {
     throw new Error(error)   
    }
}

const deleteUser = async(id) => {
    try {
        const user = await store.remove(id)

        return finalResponse = {
            user,
            "System": "User succesfully deleted"
        }
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}