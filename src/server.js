const express = require('express')
const app = express()

const router = require('./api/routes')
const config = require('./config/index')
const DB = require('./store/index')

DB(config.db_uri)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)



app.listen(config.port, console.log(`http://localhost:${config.port}`))