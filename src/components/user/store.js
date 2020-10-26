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
    let retrivedUser = await Model.findById({ _id: id})

    let entrie = Object.entries(retrivedUser)
    entrie = Object.entries(user)

    retrivedUser = Object.fromEntries(entrie)

    const updatedUser = await Model.findByIdAndUpdate(id, retrivedUser)
    return updatedUser
}


const remove = async(id) => {
    const user = await Model.findByIdAndDelete({ _id: id })
    return user
}

const addSong = async(id, songs) => {
    const user = await Model.findById({ _id: id })
    
    user.favorites.push(songs)
    console.log(user.favorites[0])
    user.save()
    
    return user
}


module.exports = {
    get,
    getFilter,
    add,
    update,
    remove,
    addSong

}