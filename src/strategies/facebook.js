const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const config = require('../config/index')
const controller = require('../components/auth/controller')

passport.use(
    new FacebookStrategy(
        {
            clientID: config.facebook_id,
            clientSecret: config.facebook_secret,
            callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
            profileFields: ["id","displayName" ,"gender", "birthday", "email", "first_name",  "last_name", ]
        },

       async (accessToken, refreshToken, profile, done) => {
            
            try {
                
                const emailB = profile.email
                ? profile.email
                : `${profile.id}@facebook.com`;
                
                const user = {
                    name : profile.displayName,
                    email: profile._json.email,
                    password: profile.id
                }
                
                const currentUser = await controller.getUser(user.email)
            
                if(currentUser){
                    return done(false, currentUser)
                }
                
                const newUser = await controller.createUser(user.name, user.email, user.password)
        
                return done(false, newUser)
            } catch (error) {
                return done(error)
            }
        }
    )
)