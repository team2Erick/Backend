const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    songs:[String]
})

const userModel = mongoose.model('Playlist', mySchema)

module.exports = userModel