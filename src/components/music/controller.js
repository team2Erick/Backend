const axios = require("axios")


module.exports = {

    async search(search) {
        const rearch = await axios.get("https://api.deezer.com/search", {
            params: {
                q: search,
            }
        });
        return rearch.data.data
    },

    discover: {

        async global() {

        }

    },

    async genre() {
        const songs = await axios.get("https://api.deezer.com/search", {
            params: {
                q: "rock",
            }
        });
        var artists = await axios.get("https://api.deezer.com/genre/152/artists");

        artists = artists.data.data.splice(0, 4);

        console.log(artists.length);

        for (const artistIndex in artists) {

            let tracks = await axios.get(`https://api.deezer.com/artist/${artists[artistIndex].id}/top?limit=10`)
            let artist = await axios.get(`https://api.deezer.com/artist/${artists[artistIndex].id}`)

            artists[artistIndex].tracks = tracks.data.data
            artists[artistIndex].fans = artist.data.nb_fan
            artists[artistIndex].nb_album = artist.data.nb_album

        }

        return {
            songs: songs.data.data,
            artists
        }

    },

    async album() {

        const albums = [
            "9706844",
            "133279102",
            "778452",
            "437484672",
            "9410106"
        ]

        const albumsObject = []

        for (const album of albums) {
            const albumQuery = await axios.get("https://api.deezer.com/album/" + album);
            albumsObject.push(albumQuery.data)
        }

        return albumsObject

    }

}