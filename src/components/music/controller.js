const store = require('./store')

const addFavorite = async (id, favorites) => {
    try {
        if(!favorites){
            throw new Error("Missing Data")
        }

        const songs = await store.addSong(id, favorites)
        
        const finalResponse = {
            songs,
            System: "Song added to Your favorite list"
        }

        return finalResponse
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
        
        const finalResponse = {
            songs,
            System: "Song removed of Your favorite list"
        }

        return finalResponse
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

const getOnePlaylist = async (id,playlistId) => {
    try {
        if(!id || !playlistId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.onePlaylist(id, playlistId)
        return playlist
                
        
    } catch (error) {
        throw new Error(error)
    }
}

const deletePlaylist = async (id, playlistId) => {
    try {
        if(!id || !playlistId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.removePlaylist(id, playlistId)
        
        const finalResponse = {
            playlist,
            System: "Playlist removed "
        }

        return finalResponse
                
        
    } catch (error) {
        throw new Error(error)
    }
}


const updatePlaylist = async (id,playlistId, newname) => {
    try {
        if(!id || !playlistId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.uPlaylist(id, playlistId, newname)
        
        const finalResponse = {
            playlist,
            System: "Playlist Updated"
        }

        return finalResponse
                
        
    } catch (error) {
        throw new Error(error)
    }
}

const addSongPlaylist = async (id,playlistId, song) => {
    try {
        if(!id || !playlistId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.songPlaylist(id, playlistId, song)
        
        const finalResponse = {
            playlist,
            System: "Song added"
        }

        return finalResponse
                
        
    } catch (error) {
        throw new Error(error)
    }
}

const deleteSongPlaylist = async (id,playlistId, song) => {
    try {
        if(!id || !playlistId){throw new Error("Missing Playlist name")}
        
        const playlist = await store.removeSongPlaylist(id, playlistId, song)
        
        
        const finalResponse = {
            playlist,
            System: "Song removed"
        }

        return finalResponse
        
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