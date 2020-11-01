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
                throw new Error("User or Password incorrect")
            }

            req.login(user, { session: false }, (error) => {
                if(error){
                    next(error)
                }
            })
 
            const token = await controller.createToken(user)

            res.cookie('token', token, {
                httpOnly: true,
                secure: false

            }) 
            
            return  response.success(req, res, { token, "System" : "User succesfully loged"}, 201)

        } catch (error) {
<<<<<<< HEAD
            response.error(req, res, error.message,  error)  
=======
            response.error(req, res, error.message,  error) 
>>>>>>> master
        }
    })(req, res, next)
})

router.get('/google', passport.authenticate('google' , { scope: ['profile', 'email', 'openid']}))

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, async (error, user) => {
        if(error || !user){
            throw new Error("User not found")
        }
    
        if(user.gender){
            const token = await controller.createToken(user)

            res.cookie('token', token, {
                httpOnly: true,
                secure: false

            })

            response.success(req, res, { token, "System" : "User succesfully loged"}, 201)
        }else{
            res.redirect(201,`/api/auth/end-singup/${user._id}`)
        }
        
    })(req, res, next)
})

router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}))

router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', { session: false }, async (error, user) => {
        if(error || !user){
            throw new Error("user not found")
        }
    
        if(user.gender){
            const token = await controller.createToken(user)

            res.cookie('token', token, {
                httpOnly: true,
                secure: false

            })

            response.success(req, res, { token, "System" : "User succesfully loged"}, 201)
        }else{
            res.redirect(201,`/api/auth/end-singup/${user._id}`)
        }

    })(req, res, next)
})

router.post('/end-singup/:id', upload.single('image') ,async(req, res) => {
    try {

        const { birthdate, country, gender } = req.body
        const userInfo = await controller.addExtraInfo(birthdate, country, gender, req.file , req.params.id, req.headers.host, req.protocol)
        
        const token = await controller.createToken(userInfo)

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
        })

        response.success(req, res, {token, System: "You complete your singup"}, 201)
    } catch (error) {
        response.error(req, res, error.message, error) 
    }
})

router.post('/recover', async(req, res) => {
    try {
        const { email } = req.body

        const data = await controller.passwordRecover(email, req.headers.host,req.protocol)
        response.success(req, res, {System: "Email sent to your email account"}, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)  
    }
})

router.post('/reset/:token', async(req, res) => {
    try {
        const {password} = req.body
        const {token} = req.params
        const data =  await controller.reset(token , password)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})


module.exports = router