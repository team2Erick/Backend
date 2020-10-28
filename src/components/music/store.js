const Model = require('../../store/models/user')

const addSong = async(id, songs) => {
    const user = await Model.findById({ _id: id })
    
    user.favorites.push(songs)
    user.save()
    
    return user
}

const getSong = async(id) => {
    const user = await Model.findById({ _id: id })
    
    console.log(user.favorites)
    return user.favorites
}

const deleteSong = async(id, song) => {
    const user = await Model.findById({ _id: id })
    
    const index = user.favorites.indexOf(song)
    
    const result = user.favorites.splice(index, 1)
    user.save()
    return result
}

const addPlaylist = async(id, playlistUser) => {
    const user = await Model.findById({_id: id})

    
    user.playlist = playlistUser

    const newPlaylist = await user.save()

    
    return newPlaylist
}

module.exports = {
    addSong,
    getSong,
    addPlaylist,
    deleteSong
}