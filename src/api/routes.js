const user = require('../components/user/network')
const auth = require('../components/auth/network')
const artist = require('../components/artist/network')
const music = require('../components/music/network')
const usermusic = require('../components/playlist/network')

const routes = app => {
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/artist', artist)
    app.use('/api/music', music)
    app.use('/api/usermusic', usermusic)
}

module.exports = routes