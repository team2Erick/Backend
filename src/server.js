const express = require('express')
const app = express()

const router = require('./api/routes')
const DB = require('./store/index')
const config = require('./config/index')

DB(config.db_uri)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)



app.listen(config.port, console.log(`Server listen at http://localhost:${config.port}`))