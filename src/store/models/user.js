const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    email: String,
    image: String,
    password: String,
    age: Number,
    country: String,
    gender: String,
    favorites:[String],
    playlist: {
        type: Schema.ObjectId,
        ref: "Playlist",
    }
})

const userModel = mongoose.model('User', mySchema)

module.exports = userModel