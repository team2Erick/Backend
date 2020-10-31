const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.get('/search', async (req, res) => {

    console.log();
    try {
        const searchQuery = await controller.search(req.query.search);
        response.success(req, res, searchQuery, 201);
    } catch (error) {
        response.error(req, res, error.message, 404, error);
    }
})

module.exports = router;