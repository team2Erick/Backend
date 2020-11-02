const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.get('/search', async (req, res) => {
    try {
        const searchQuery = await controller.search(req.query.search);
        response.success(req, res, searchQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, error);
    }
})

router.post('/play', async (req, res) => {
    try {
        const addPlayQuery = await controller.addPlay({
            user: req.body.user,
            trackId: req.body.trackId,
            song: req.body.song
        });
        response.success(req, res, addPlayQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, error);
    }
})

router.get('/history', async (req, res) => {
    try {
        const getHistoryQuery = await controller.getHistory({
            user: req.query.user
        });
        response.success(req, res, getHistoryQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, error);
    }
})

router.get('/discover', async (req, res) => {
    try {

        const discoverQuery = await controller.discover();
        response.success(req, res, discoverQuery, 201);

    } catch (error) {
        response.error(req, res, error.message, error);
    }
})

router.get("/genre", async (req, res) => {

    try {
        const genreQuery = await controller.genre(req.query.genre);
        response.success(req, res, genreQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, error);
    }

})


router.get("/album", async (req, res) => {

    try {
        const albumQuery = await controller.album();
        response.success(req, res, albumQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, error);
    }

})



module.exports = router;