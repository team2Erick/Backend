const store = require('./store')
const bcrypt = require('bcrypt')


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

const createUser = async (name, email, password, age, country) => {
    try {
        if (!name || !email || !password || !age || !country){
            throw new Error("Missing Data")
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user =  {
            name,
            email,
            age,
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

const updateUser = async(name, email, password, age, country, id) => {
    try {
        if (!name || !email || !password || !age || !country){
            throw new Error("Missing Data")
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user =  {
            name,
            email,
            age,
            country,
            password: hashedPassword
        }

        const updatedUser = await store.update(id, user)

        const finalResponse = {
            user,
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

const addFavorite = async (id, favorites) => {
    try {
        if(!favorites){
            throw new Error("Missing Data")
        }

        const songs = await store.addSong(id, favorites)
        return songs
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFavorite

}