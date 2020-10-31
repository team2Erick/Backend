const mongoose = require('mongoose')

const Schema = mongoose.Schema


const mySchema = new Schema({
    user: {
        type: Schema.ObjectID
    },
    Song: {
        type: Schema,
        default: {}
    },
})


const userModel = mongoose.model('PlayedSongs', mySchema)

module.exports = userModel