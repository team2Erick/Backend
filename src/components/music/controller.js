const store = require('./store')

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

const getFavorite = async (id) => {
    try {
        if(!id){
            throw new Error("Missing Data")
        }

        const songs = await store.getSong(id)
        return songs
    } catch (error) {
        throw new Error(error)
    }
}

const deleteFavorite = async (id, song) => {
    try {
        if(!id){
            throw new Error("Missing Data")
        }

        const songs = await store.deleteSong(id, song)
        return songs
    } catch (error) {
        throw new Error(error)
    }
}


const playlist = async (id, name, songs) => {
    try {

        if(!id || !name || !songs){ throw new Error ("Missing Data")}

        const playlist = {
            name,
            songs
        }

        const newPlaylist = await store.addPlaylist(id, playlist)

        const finalResponse = {
            newPlaylist,
            System: "Playlist created"
        }

        return finalResponse
    } catch (error) {
        throw new Error(error)
    }
}

const getPlaylist = async (id) => {
    try {
        if(!id){throw new Error("Not user id")}
        
        const playlist = await store.allPlaylist(id)
        
        return playlist
    } catch (error) {
        throw new Error(error)
    }
}

const getOnePlaylist = async (id,nameId) => {
    try {
        if(!id || !nameId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.onePlaylist(id, nameId)
        return playlist
                
        
    } catch (error) {
        throw new Error(error)
    }
}

const deletePlaylist = async (id, nameId) => {
    try {
        if(!id || !nameId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.removePlaylist(id, nameId)
        return playlist
                
        
    } catch (error) {
        throw new Error(error)
    }
}


const updatePlaylist = async (id,name, newname) => {
    try {
        if(!id || !name){throw new Error("Missing Playlist name")}
        
        const playlist = await store.uPlaylist(id, name, newname)
        return playlist
                
        
    } catch (error) {
        throw new Error(error)
    }
}

const addSongPlaylist = async (id,name, song) => {
    try {
        if(!id || !name){throw new Error("Missing Playlist name")}
        
        const playlist = await store.songPlaylist(id, name, song)
        return playlist
                
        
    } catch (error) {
        throw new Error(error)
    }
}

const deleteSongPlaylist = async (id,nameId, song) => {
    try {
        if(!id || !nameId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.removeSongPlaylist(id, nameId, song)
        return playlist
                
        
    } catch (error) {
        throw new Error(error)
    }
}



module.exports = {
    addFavorite,
    getFavorite,
    playlist,
    deleteFavorite,
    getPlaylist,
    getOnePlaylist,
    deletePlaylist ,
    updatePlaylist ,
    addSongPlaylist,
    deleteSongPlaylist
}