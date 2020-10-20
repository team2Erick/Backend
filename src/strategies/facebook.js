const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const config = require('../config/index')
const controller = require('../components/auth/controller')

passport.use(
    new FacebookStrategy(
        {
            clientID: "453237188990617",
            clientSecret: "adc5d721d8fcf028ff0f4fcdf0d9de13",
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profilerFields: ["id","displayName", "email"]
        },

       async (accessToken, refreshToken, profile, done) => {
            
            
            const emailB = profile.email
            ? profile.email
            : `${profile.id}@facebook.com`;
            
            const user = {
                name : profile.displayName,
                email: emailB,
                password: profile.id
            }
            
            const currentUser = await controller.getUser(user.email)
        
            if(currentUser){
                return done(false, currentUser)
            }
            
            const newUser = await controller.createUser(user.name, user.email, user.password)
    
            return done(false, newUser)
        }
    )
)