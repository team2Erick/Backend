const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')
const config = require('../../config/index')

require('../../strategies/artistAuth')

router.get('/getartist', async(req, res) => {
    try {
        const artists = await controller.getAllArtist()
        response.success(req, res, artists, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.get('/getartist/:id', async(req, res) => {
    try {
        const artist = await controller.getArtist(req.params.id)
        response.success(req, res, artist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, country, record } = req.body

        const newArtist = await controller.createArtist(name, email, password, country, record)
        response.success(req, res, newArtist, 201)
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
})

router.put('/update/:id', async(req, res) => {
    try {
        const { name, email, password, country, record } = req.body
        
        const updatedArtist = await controller.updateArtist(name, email, password, country, record, req.params.id)
        response.success(req, res, updatedArtist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const deletedArtist = await controller.deleteArtist(req.params.id)
        response.success(req, res, deletedArtist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.post('/login', (req, res, next) => {
    
    passport.authenticate('basic',async  (error, user) => {
        try {
            if(error || !user){
                console.log(user)
                throw new Error("User not found")
            }

            req.login(user, { session: false }, (error) => {
                if(error){
                    next(error)
                }
            })

            const { _id: id, name, email } = user[0];
                        
            const payload = {
                sub: id,
                name,
                email
            }
            
            
            const token = jwt.sign(payload, config.jwt_key,{
                expiresIn: '15m'
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: false

            }) 
            
            return  response.success(req, res, { token, "System" : "Artist succesfully loged"})

        } catch (error) {
            next(error)
        }
    })(req, res, next)
})

module.exports = router