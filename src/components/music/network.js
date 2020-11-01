const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.get('/search', async (req, res) => {
    try {
        const searchQuery = await controller.search(req.query.search);
        response.success(req, res, searchQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, 404, error);
    }
})

router.get('/discover', async (req, res) => {
    try {

        var searchQuery = {}

        if (req.query.userId) {

        } else {
            searchQuery = await controller.discover.global();
        }

        response.success(req, res, searchQuery, 201);

    } catch (error) {
        response.error(req, res, error.message, 404, error);
    }
})

router.get("/genre", async (req, res) => {

    try {
        const genreQuery = await controller.genre();
        response.success(req, res, genreQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, 404, error);
    }

})


router.get("/album", async (req, res) => {

    try {
        const albumQuery = await controller.album();
        response.success(req, res, albumQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, 404, error);
    }

})



module.exports = router;