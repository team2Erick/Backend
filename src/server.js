const express = require('express')
const app = express()

const router = require('./api/routes')
const DB = require('./store/index')

DB('mongodb+srv://omargnzlz645:resina96@cluster0.biyni.mongodb.net/social_job?retryWrites=true&=majority')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)



app.listen(8080, console.log("server listen at http://localhost:8080"))