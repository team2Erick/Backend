const Model = require('../../store/models/user')




const addSong = async(id, songs) => {
    const user = await Model.findById({ _id: id })
    
    user.favorites.push(songs)
    user.save()
    
    return user
}

const getSong = async(id) => {
    const user = await Model.findById({ _id: id })
    
    return user.favorites
}


const deleteSong = async(id, song) => {
    const user = await Model.findById({ _id: id })
    
    const index = user.favorites.indexOf(song)
    
    const result = user.favorites.splice(index, 1)
    user.save()
    return user.favorites
}

const addPlaylist = async(id, playlistUser) => {
    const user = await Model.findById({_id: id})

    user.playlist.push(playlistUser)

    const newPlaylist = await user.save()

    
    return newPlaylist
}

const allPlaylist = async(id) => {
   
    const user = await Model.findById({_id: id})

    return user.playlist
}

const onePlaylist = async(id, playlistId) => {
    
    const user = await Model.findById({_id: id})

    const playlistFilter = (playlist) => playlist._id == playlistId
    
    const data = user.playlist.filter(playlistFilter)
    console.log(user.playlist)
    if(data.length === 0){throw new Error("Not such a playlist")}
    
    return data
}

const removePlaylist = async(id, playlistId) => {
   
    const user = await Model.findById({_id: id})
    const playlistFilter = (playlist) => playlist._id == playlistId


    const data = user.playlist.filter(playlistFilter)
    if(data.length === 0){throw new Error("Not such a playlist")}
    
    data[0].remove()
    user.save()
    user.update()

    return data

}

const uPlaylist = async(id, playlistId, newname) => {
   
    const user = await Model.findById({_id: id})
    const playlistFilter = (playlist) => playlist._id == playlistId


    const data = user.playlist.filter(playlistFilter)
    if(data.length === 0){throw new Error("Not such a playlist")}
    
    data[0].name = newname

    user.save()
    return data
}

const songPlaylist = async(id, playlistId, song) => {
   
    const user = await Model.findById({_id: id})
    const playlistFilter = (playlist) => playlist._id == playlistId


    const data = user.playlist.filter(playlistFilter)
    if(data.length === 0){throw new Error("Not such a playlist")}
    
    data[0].songs.push(song)

    user.save()
    return data
}

const removeSongPlaylist = async(id, playlistId, song) => {
   
    const user = await Model.findById({_id: id})
    const playlistFilter = (playlist) => playlist._id == playlistId


    const data = user.playlist.filter(playlistFilter)
    if(data.length === 0){throw new Error("Not such a playlist")}
    
    const index = data[0].songs.indexOf(song)
    data[0].songs.splice(index, 1)

    user.save()
    return data
}



module.exports = {
    addSong,
    getSong,
    addPlaylist,
    deleteSong,
    allPlaylist,
    onePlaylist,
    removePlaylist,
    uPlaylist,
    songPlaylist,
    removeSongPlaylist

}