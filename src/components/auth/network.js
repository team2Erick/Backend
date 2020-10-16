const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')
const passport = require('passport')
const jwt = require('jsonwebtoken')

require('../../strategies/basic')

router.get('/login', (req, res, next) => {
    
    passport.authenticate('basic', (error, user) => {
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
            
            
            const token = jwt.sign(payload, config.jwt_secret,{
                expiresIn: '15m'
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: false

            }) 
            
            return  response.success(req, res, { token})

        } catch (error) {
            next(error)
        }
    })(req, res, next)
})


module.exporst = router