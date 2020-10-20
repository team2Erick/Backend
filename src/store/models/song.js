const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    file: String,
    album: String
})

const userModel = mongoose.model('Song', mySchema)

module.exports = userModel