
require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generalRoute = require('./server/route/generalRoute');
const utilityRoute = require('./server/route/utilityRoute');

const allConfig = require('./config');
const env = require('./common/utils/env.js');

const environment = env.environment;

const config = allConfig[environment];
const port = config.port;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Pixel Art API',
      description: 'Pixel Art API Documentation built with ExpressJS',
      version: '1.0.0',
      contact: {
        name: 'Glenn Chia',
        email: 'glenn_chia@mymail.sutd.edu.sg'
      },
      servers: [config.server]
    }
  },
  apis: ['app.js', './server/route/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', generalRoute, utilityRoute);

app.listen(port, () => {
  console.log(`${environment} Server listening on port ${port}`);
});