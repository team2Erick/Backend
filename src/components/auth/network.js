const express = require('express')
const router = express.Router()
//const controller = require('./controller')
const response = require('../../network/response')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../config/index')

require('../../strategies/basic')
require('../../strategies/google')
require('../../strategies/facebook')

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
            
            return  response.success(req, res, { token, "System" : "User succesfully loged"})

        } catch (error) {
            next(error)
        }
    })(req, res, next)
})

router.get('/google', passport.authenticate('google' , { scope: ['profile', 'email', 'openid']}))

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (error, user) => {
        if(!user){
            next(boom.unauthorized('Unexpected error'))
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

router.get('/facebook', passport.authenticate('facebook' , { scope: ['profile', 'email', 'openid']}))

module.exports = router