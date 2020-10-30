const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    duration: String,
    genre: String,
    tracknumber: String,
    plays: [Date],
    album: {
        type: Schema.ObjectId,
        ref: "Album"
    }
})

const userModel = mongoose.model('Song', mySchema)

module.exports = userModel