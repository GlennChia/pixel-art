const express = require('express');
let router = express.Router();
const constants = require('../../common/constants');

/**
 * @swagger
 * /healthcheck:
 *  get:
 *    tags: 
 *      - Auxiliary
 *    description: Healthcheck for server status
 *    responses:
 *      '200':
 *        description: Server is healthy   
 */
router.get('/healthcheck', (req, res) => {
  res.status(200).send(constants.healthCheckMessage);
});

module.exports = router;