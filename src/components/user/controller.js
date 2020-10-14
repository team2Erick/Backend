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

module.exports = {
    getAllUsers,
    createUser,

}