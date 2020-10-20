const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const config = require('../config/index')

passport.use(
    new FacebookStrategy(
        {
            clientID: "453237188990617",
            clientSecret: "adc5d721d8fcf028ff0f4fcdf0d9de13",
            callbackURL: '/auth/facebook/callback'
        },

        (accessToken, refreshToken, profile, done) => {
            console.log(profile)
        }
    )
)