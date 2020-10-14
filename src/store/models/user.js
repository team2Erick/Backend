const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    country: String
})

const userModel = mongoose.model('User', mySchema)

module.exports = userModel