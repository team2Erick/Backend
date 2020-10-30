const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const controller = require('./controller')
const response = require('../../network/response')


router.post('/add-favorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.addFavorite(req.params.idUser , req.body.favorites)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.get('/favorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.getFavorite(req.params.idUser)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/favorites/:idUser', async(req, res) => {
    try {
        const favoritesLists = await controller.deleteFavorite(req.params.idUser, req.query.song)
        response.success(req, res, favoritesLists, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})



router.post('/create-playlist/:id', async(req, res) => {
    try {
        const {name, songs} = req.body

        const playlist = await controller.playlist(req.params.id,name, songs )
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.get('/playlist/:id', async(req, res) => {
    try {
        const playlist = await controller.getPlaylist(req.params.id)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.get('/one-playlist/:id', async(req, res) => {
    try {
        const { playlist } = req.query

        const userPlaylist = await controller.getOnePlaylist(req.params.id, playlist)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/delete-playlist/:id', async(req, res) => {
    try {
        const { playlist } = req.query

        const userPlaylist = await controller.deletePlaylist(req.params.id, playlist)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.put('/update-playlist/:id', async(req, res) => {
    try {
        const { name, newname } = req.body

        const playlist = await controller.updatePlaylist(req.params.id, name, newname)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.post('/addSong-playlist/:id', async(req, res) => {
    try {
        const { name, song } = req.body

        const playlist = await controller.addSongPlaylist(req.params.id, name, song)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/deleteSong-playlist/:id/:playlist', async(req, res) => {
    try {
        const {  song } = req.query

        const userPlaylist = await controller.deleteSongPlaylist(req.params.id, req.params.playlist, song)
        response.success(req, res, userPlaylist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})


module.exports = router