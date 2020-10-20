const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    songs:{
        type:[String],
        default: undefined
    }
})

const userModel = mongoose.model('Playlist', mySchema)

module.exports = userModel