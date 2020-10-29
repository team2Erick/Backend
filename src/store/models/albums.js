const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    band: String,
    year: String,
    genre: String,
    tracklist: [String],
    cover: String,
    country:String
})

const userModel = mongoose.model('Album', mySchema)

module.exports = userModel