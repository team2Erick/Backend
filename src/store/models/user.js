const mongoose = require('mongoose')
const crypto = require('crypto')

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: "String",
    songs: [String]
})

const playedSong = new Schema({
    songs: String
})

const mySchema = new Schema({
    name: String,
    email: String,
    image: String,
    password: String,
    birthdate: Date,
    country: String,
    gender: String,
    favorites:[String],
    playlist: [playlistSchema],
    PasswordToken: String,
})


const userModel = mongoose.model('User', mySchema)

module.exports = userModel