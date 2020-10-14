const Model = require('../../store/models/user')


const get = async () => {
    const user =  await Model.find()
    return user
}

const add = async (user) => {
    const newUser =  new Model(user)
    return  newUser.save
}

module.exports = {
    get,
    add
}