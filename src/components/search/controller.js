
const http = require("http");
const axios = require("axios")

const search = async (search) => {
    const rearch = await axios.get("https://api.deezer.com/search?q=" + search);
    return rearch.data.data
}
module.exports = {

    search

}