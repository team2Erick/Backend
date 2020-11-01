const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

require('../../strategies/jwt')

router.post('/add-favorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.addFavorite(req.params.idUser , req.body.favorites)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    
    }
})

router.get('/favorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.getFavorite(req.params.idUser)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.delete('/favorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.deleteFavorite(req.params.idUser, req.query.song)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})



router.post('/create-playlist/:id', async(req, res) => {
    try {
        const {name, songs} = req.body

        const playlist = await controller.playlist(req.params.id,name, songs )
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.get('/playlist/:id', async(req, res) => {
    try {
        const playlist = await controller.getPlaylist(req.params.id)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.get('/one-playlist/:id', async(req, res) => {
    try {
        const { playlist } = req.query

        const userPlaylist = await controller.getOnePlaylist(req.params.id, playlist)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.delete('/delete-playlist/:id', async(req, res) => {
    try {
        const { playlist } = req.query

        const userPlaylist = await controller.deletePlaylist(req.params.id, playlist)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.put('/update-playlist/:id', async(req, res) => {
    try {
        const { newname } = req.body
        const { playlist } = req.query

        const userPlaylist = await controller.updatePlaylist(req.params.id, playlist, newname)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.post('/addSong-playlist/:id', async(req, res) => {
    try {
        const { song } = req.body
        const { playlist } = req.query

        const userPlaylist = await controller.addSongPlaylist(req.params.id, playlist, song)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})

router.delete('/deleteSong-playlist/:id/:playlist', async(req, res) => {
    try {
        const {  song } = req.query

        const userPlaylist = await controller.deleteSongPlaylist(req.params.id, req.params.playlist, song)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message,  error)
    }
})


module.exports = router