const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt');
const confing = require('../config/index')
const Model = require('../store/models/user')

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.token;
    }
    console.log(token)
    return token;
};

passport.use(
    new Strategy(
        {
            secretOrKey = confing.jwt_key,
            jwtFromRequest = cookieExtractor
        },

        async (tokenpayload, cb) => {
            try {
                const user = await Model.findOne({ email: tokenpayload.email })

                if(!user){
                    return cb(error, false)
                }

                delete user.password

                return cb(null, {...user})
            } catch (error) {
                return cb(error)
            }
        }
    )
)