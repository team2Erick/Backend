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
        const favoritesLists = await controller.deleteFavorite(req.params.idUser, req.body.song)
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
        const { name } = req.body

        const playlist = await controller.getOnePlaylist(req.params.id, name)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.delete('/delete-playlist/:id', async(req, res) => {
    try {
        const { name } = req.body

        const playlist = await controller.deletePlaylist(req.params.id, name)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})

router.put('/update-playlist/:id', async(req, res) => {
    try {
        const { name } = req.body

        const playlist = await controller.deletePlaylist(req.params.id, name)
        response.success(req, res, playlist, 201)
    } catch (error) {
        response.error(req, res, error.message, 404, error)
    }
})


module.exports = router