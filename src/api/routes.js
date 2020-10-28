const user = require('../components/user/network')
const auth = require('../components/auth/network')
const artist = require('../components/artist/network')

const routes = app => {
    app.use('/api/user', user),
    app.use('/api/auth', auth),
    app.use('/api/artist', artist)
}

module.exports = routes