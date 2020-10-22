const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const controller = require('./controller')
const response = require('../../network/response')


const storage = multer.diskStorage({
    destination: 'public/files',
    filename: function (req, file, cb) {
      cb(null, file.filename + '-' + Date.now() +
          path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

router.get('/getall', async(req, res) => {
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

router.post('/signup',upload.single('image') ,async (req, res) => {
    try {
        const { name, email, password, age, country, gender } = req.body

        const newUSer = await controller.createUser(name, email, password, age, country,gender , req.file)
        response.success(req, res, newUSer, 201)
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
})

router.put('/update/:id', upload.single('image') ,async(req, res) => {
    try {
        const { name, email, password, age, country, gender} = req.body
        
        const updatedUser = await controller.updateUser(name, email, password, age, country, gender ,req.file ,req.params.id)
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

router.post('/addfavorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.addFavorite(req.params.idUser , req.body.favorites)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

module.exports = router