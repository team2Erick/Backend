require('dotenv').config()

const config = {
    port: process.env.PORT || 3000 ,
    db_uri: process.env.DB_URI,
    jwt_key: process.env.AUTH_JWT_SECRET,
    google_id: process.env.GOOGLE_CLIENT_ID,
    google_secret: process.env.GOOGLE_CLIENT_SECRET,
    facebook_id: process.env.FACEBOOK_CLIENT_ID,
    facebook_secret: process.env.FACEBOOK_CLIENT_SECRET,
    password_email: process.env.PASSWORD_EMAIL

}

module.exports = config