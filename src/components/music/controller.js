const axios = require("axios")
const store = require("./store")

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

    async genre(genre) {


        if (genre) {

            genre = JSON.parse(genre)

            let songs = await axios.get("https://api.deezer.com/search", {
                params: {
                    q: genre.name,
                }
            });

            var artists = await axios.get(`https://api.deezer.com/genre/${genre.id}/artists`);

            artists = artists.data.data.splice(0, 4);

            for (let artistIndex in artists) {

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
        } else {

            let songs = await axios.get("https://api.deezer.com/search", {
                params: {
                    q: "rock",
                }
            });

            var artists = await axios.get("https://api.deezer.com/genre/152/artists");

            artists = artists.data.data.splice(0, 4);

            for (let artistIndex in artists) {

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

        }


    },

    async album() {

        const albums = [
            "9706844",
            "133279102",
            "91272",
            "11130386",
            "9410106",
            "182475962",
            "1225855",
            "381154",
            "138794092",
            "13162620",
            "212377",
            "299821",
            "58815872"
        ];

        const albumsObject = [];

        for (const album of albums) {
            const albumQuery = await axios.get("https://api.deezer.com/album/" + album);
            albumsObject.push(albumQuery.data);
        }

        return albumsObject;

    },

    async addPlay(play) {
        try {
            return await store.addPlay(play);
        } catch (error) {
            throw new Error(error)
        }
    }

}