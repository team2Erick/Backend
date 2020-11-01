const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const controller = require('./controller')
const response = require('../../network/response')


require('../../strategies/jwt')

const storage = multer.diskStorage({
    destination: (req, file, cb ) => cb(null, "public/files"),
    filename: (req, file, cb) => {
      cb(null, file.name + '-' + Date.now() +
          path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

router.get('/users', async(req, res) => {
    try {
        const users = await controller.getAllUsers()
        response.success(req, res, users, 201)
    } catch (error) {
        response.error(req, res, error.message, error)
    }
})

router.get('/user-profile/:id', async(req, res) => {
    try {
        const user = await controller.getUser(req.params.id)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, error)
    }
})

router.post('/sign-up',upload.single('image') ,async (req, res) => {
    try {
        const { name, email, password, birthdate, country, gender } = req.body

        const newUSer = await controller.createUser(name, email, password, birthdate, country,gender , req.file, req.headers.host, req.protocol)
        response.success(req, res, newUSer, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.put('/update/:id', upload.single('image') ,async(req, res) => {
    try {
        const { name, email, password, birthdate, country, gender} = req.body
        
        const updatedUser = await controller.updateUser(name, email, password, birthdate, country, gender ,req.file ,req.params.id, req.headers.host, req.protocol)
        response.success(req, res, updatedUser, 201)
    } catch (error) {
        response.error(req, res, error.message, error)
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const deletedUser = await controller.deleteUser(req.params.id)
        response.success(req, res, deletedUser, 201)
    } catch (error) {
        response.error(req, res, error.message, error)
    }
})



module.exports = router