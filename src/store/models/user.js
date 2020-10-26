const mongoose = require('mongoose')
const crypto = require('crypto')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    email: String,
    image: String,
    password: String,
    age: Date,
    country: String,
    gender: String,
    favorites:[String],
    playlist: {
        type: Schema.ObjectId,
        ref: "Playlist",
    },
    resetPasswordToken: String,
})


const userModel = mongoose.model('User', mySchema)

module.exports = userModel