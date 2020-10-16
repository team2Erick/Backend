const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const controller = require('./controller')
const response = require('../../network/response')


require('../../strategies/basic')

router.get('/login' , (req, res, next) => {
  //
})

module.exports = router