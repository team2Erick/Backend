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

module.exports = {
    addFavorite,
    getFavorite,
    playlist,
    deleteFavorite
}