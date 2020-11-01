const mongoose = require('mongoose')

const Schema = mongoose.Schema
const subSchema = mongoose.subSchema

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    trackId: Number,
    song: Object
})


const userModel = mongoose.model('PlayedSongs', mySchema)

module.exports = userModel