const express = require('express');
let router = express.Router();

const utilityShuffle = require('../bll/utility/shuffle');

/**
 * @swagger
 * /utility/shuffle:
 *  get:
 *    tags:
 *      - Utility Functions
 *    summary: Randomly pick a pixel art
 *    description: Randomly pick a pixel art
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Return a single pixel art 
 *      404:
 *        description: No pixel art found
 *      500:
 *        description: Database or server error
 */ 
router.get('/utility/shuffle', utilityShuffle.shuffle);

module.exports = router;