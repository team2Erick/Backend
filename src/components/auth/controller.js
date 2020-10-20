const store = require('./store')
const bcrypt = require('bcrypt')


const getUser = async(filter) => {
    const user = await store.get(filter)
    return user
}

const createUser = async (name, email, password) => {
    if(!name || !email || !password){
        throw new Error("Missing Data")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = {
        name,
        email,
        password: hashedPassword
    }
    

    const newUser = await store.add(user)
    return newUser
    
}
module.exports = {
    getUser,
    createUser
}