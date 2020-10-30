const Model = require('../../store/models/user')


const get = async () => {
    const user =  await Model.find()
    return user
}


const getFilter = async(id) => {
    const user = await Model.findById({ _id: id})
    return user
}

const add = async (user) => {
    const newUser =  new Model(user)
    return  newUser.save()
}

const update = async(id, user) => {
    const updatedUser = Model.findByIdAndUpdate({_id: id}, user, {new: true})
    return updatedUser
}


const remove = async(id) => {
    const user = await Model.findByIdAndDelete({ _id: id })
    return user
}




module.exports = {
    get,
    getFilter,
    add,
    update,
    remove,
}