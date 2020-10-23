const Model = require('../../store/models/user')

const get = async (filter) => {
    const user = await Model.findOne({ email: filter })
    console.log(user)
    return user
}

const add = async (user) => {
    const newUser = new Model(user)
    return newUser.save() 
}

const addExtraInfo = async(user, id) => {
    const data = Model.findByIdAndUpdate({_id: id}, user)
    return data
}
module.exports = {
    get,
    add,
    addExtraInfo
}