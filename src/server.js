const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const cookieParse = require('cookie-parser')
const cors = require('cors');

const router = require('./api/routes')
const config = require('./config/index')
const DB = require('./store/index')

DB(config.db_uri)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParse())
app.use(session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

router(app)

app.use('/public', express.static('public'))

app.listen(config.port, console.log(`http://localhost:${config.port}`))