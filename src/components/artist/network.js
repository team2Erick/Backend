const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const controller = require('./controller')
const response = require('../../network/response')
const config = require('../../config/index')

//require('./authArtist')

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
        const artists = await controller.getAllArtist()
        response.success(req, res, artists, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.get('/getartist/:id',passport.authenticate('jwt', {session: false}) ,async(req, res) => {
    try {
        const artist = await controller.getArtist(req.params.id)
        response.success(req, res, artist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.post('/signup',upload.single('image') ,async (req, res) => {
    try {
        const { name, email, password, country, record } = req.body

        const newArtist = await controller.createArtist(name, email, password, country, record, req.file)
        response.success(req, res, newArtist, 201)
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
})

router.put('/update/:id',passport.authenticate('jwt', {session: false}),upload.single('image')  ,async(req, res) => {
    try {
        const { name, email, password, country, record } = req.body
        
        const updatedArtist = await controller.updateArtist(name, email, password, country, record, req.file ,req.params.id)
        response.success(req, res, updatedArtist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}) ,async(req, res) => {
    try {
        const deletedArtist = await controller.deleteArtist(req.params.id)
        response.success(req, res, deletedArtist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.post('/recover-artist', async(req, res) => {
    try {
        const { email } = req.body

        const data = await controller.passwordRecover(email, req.headers.host)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)  
    }
})

router.post('/reset-artist/:token', async(req, res) => {
    try {
        const {password} = req.body
        const {token} = req.params
        const data =  await controller.reset(token , password)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

module.exports = router