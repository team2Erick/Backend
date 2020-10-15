const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/getusers', async(req, res) => {
    try {
        const users = await controller.getAllUsers()
        response.success(req, res, users, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.get('/getuser/:id', async(req, res) => {
    try {
        const user = await controller.getUser(req.params.id)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
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

router.put('/update/:id', async(req, res) => {
    try {
        const { name, email, password, age, country } = req.body
        
        const updatedUser = await controller.updateUser(name, email, password, age, country, req.params.id)
        response.success(req, res, updatedUser, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const deletedUser = await controller.deleteUser(req.params.id)
        response.success(req, res, deletedUser, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

module.exports = router