const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const cookieParse = require('cookie-parser')

const router = require('./api/routes')
const config = require('./config/index')
const DB = require('./store/index')

DB(config.db_uri)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParse())
app.use(session({secret: "super secret", resave: false,  saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())

router(app)

app.use('/app', express.static('src/public'))


app.listen(config.port, console.log(`http://localhost:${config.port}`))