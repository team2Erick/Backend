const user = require('../components/user/network')
const auth = require('../components/auth/network')
const artist = require('../components/artist/network')

const routes = app => {
    app.use('/user', user),
    app.use('/auth', auth),
    app.use('/artist', artist)
}

module.exports = routes