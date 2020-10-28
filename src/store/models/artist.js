const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    image: String,
    name: String,
    email: String,
    password: String,
    country: String,
    record: String,
    albums:{
        type: Schema.ObjectId,
        ref: "Album"
    }
})

const userModel = mongoose.model('Artist', mySchema)

module.exports = userModel