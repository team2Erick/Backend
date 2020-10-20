const Model = require('../../store/models/user')

const get = async (filter) => {
    const user = await Model.findOne({ email: filter })
    return user
}

const add = async (user) => {
    const newUser = new Model(user)
    return newUser.save() 
}

module.exports = {
    get,
    add
}