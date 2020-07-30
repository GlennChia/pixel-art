var expect  = require('chai').expect;
var request = require('request');
const allConfig = require('../config');
const constants = require('../common/constants');
const env = require('../common/utils/env.js');

const environment = env.environment;
const config = allConfig[environment];
const port = config.port;

const server = require('../app');

it('healthcheck', function(done) {
    request(`http://localhost:${port}/healthcheck` , function(error, response, body) {
        expect(body).to.equal(constants.healthCheckMessage);
        done();
    });
});