const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/getUsers', async(req, res) => {
    try {
        const users = await controller.getAllUsers()
        response.success(req, res, newUSer, 201)
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, age, country } = req.body

        const newUSer = await controller.createUser(name, email, password, age, country)
        response.success(req, res, newUSer, 201)
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
})

module.exports = router