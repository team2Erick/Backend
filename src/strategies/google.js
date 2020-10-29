const passport = require('passport')
const GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy
const config = require('../config/index')
const controller = require('../components/auth/controller')



passport.use(new GoogleStrategy(
    {
        clientID: config.google_id,
        clientSecret: config.google_secret,
        callbackURL: 'https://cday-music.herokuapp.com/api/auth/google/callback'
    },

    async (token, tokenSecret, profile, done) => {
        
        const user = {
            name: profile._json.name,
            email: profile._json.email,
            password: profile.id,
            image: profile._json.picture
        }
        const currentUser = await controller.getUser(user.email)
        
        if(currentUser){
            return done(false, currentUser)
        }
        
        const newUser = await controller.createUser(user.name, user.email, user.password, user.image)

        return done(false, newUser)
    }
))