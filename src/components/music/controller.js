const axios = require("axios")


module.exports = {

    async search(search) {
        const rearch = await axios.get("https://api.deezer.com/search?q=" + search);
        return rearch.data.data
    },

    discover: {

        async global() {

        }

    }

}