const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')


const config = require('../../config/index')
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

require('../../strategies/basic')
require('../../strategies/google')
require('../../strategies/facebook')

router.post('/login', (req, res, next) => {
    
    passport.authenticate('basic',async  (error, user) => {
        try {
            if(error || !user){
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
            
            return  response.success(req, res, { token, "System" : "User succesfully loged"})

        } catch (error) {
            next(error)
        }
    })(req, res, next)
})

router.get('/google', passport.authenticate('google' , { scope: ['profile', 'email', 'openid']}))

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (error, user) => {
        if(error || !user){
            throw new Error("User not found")
        }
    
        const { _id: id, name, email } = user;
                            
        const payload = {
            sub: id,
            name,
            email
        }
    
        const token = jwt.sign(payload, config.jwt_key, {
            expiresIn: '15m'
        })
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
        })
    
        return res.status(201).json({ token, "System message":"user succesfully logged in with google" })

        
    })(req, res, next)
})

router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}))

router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', { session: false }, async (error, user) => {
        if(error || !user){
            throw new Error("User not found")
        }
    
        const { _id: id, name, email } = user;
                            
        const payload = {
            sub: id,
            name,
            email
        }
    
        const token = jwt.sign(payload, config.jwt_key, {
            expiresIn: '15m'
        })
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
        })
    
        return res.status(201).json({ token, "System message":"user succesfully logged in with facebook" })

    })(req, res, next)
})

router.post('/end-singup/:id', passport.authenticate('jwt', {session: false}),upload.single('image') ,async(req, res) => {
    try {
        const { age, country, gender } = req.body
        const userInfo = await controller.addExtraInfo(age, country, gender, req.file , req.params.id)
        response.success(req, res, userInfo, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error) 
    }
})

router.post('/recover', async(req, res) => {
    try {
        const { email } = req.body

        const data = await controller.passwordRecover(email, req.headers.host,req.protocol)
        response.success(req, res, {System: "Email sent to your email account"}, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)  
    }
})

router.post('/reset/:token', async(req, res) => {
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