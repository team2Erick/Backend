const passport = require('passport')
const GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy
const config = require('../config/index')
const controller = require('../components/auth/controller')



passport.use(new GoogleStrategy(
    {
        clientID: config.google_id,
        clientSecret: config.google_secret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },

    async (token, tokenSecret, profile, done) => {
        
        console.log(profile)
        const user = {
            name: profile._json.name,
            username: profile._json.given_name,
            email: profile._json.email,
            password: profile.id
        }
        const currentUser = await controller.getUser(user.email)
        
        if(currentUser){
            return done(false, currentUser)
        }
        
        const newUser = await controller.createUser(user.name, user.username, user.email, user.password)

        return done(false, newUser)
    }
))