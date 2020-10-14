const DB = require('mongoose')

DB.Promise = global.Promise

const connect = async (url) => {
    try{
        await DB.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        })
        console.log("DB successfully connected")
    }catch (error){
        console.log(error)
    }
}

module.exports = connect