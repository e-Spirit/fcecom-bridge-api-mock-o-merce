'use strict';
require('dotenv').config();
const path = require('path');
const http = require('http');

const oas3Tools = require('oas3-tools');
const serverPort = process.env.BRIDGE_SERVER_PORT;

const { BRIDGE_AUTH_USERNAME, BRIDGE_AUTH_PASSWORD, auth = BRIDGE_AUTH_PASSWORD && `${BRIDGE_AUTH_USERNAME}:${BRIDGE_AUTH_PASSWORD}` } = process.env;

// basic auth
function validate(request) {
  return request.headers.authorization === `Basic ${Buffer.from(auth).toString('base64')}`;
}

// swaggerRouter configuration
const options = {
  routing: {
    controllers: path.join(__dirname, './controllers'),
  },
  openApiValidator: {
    validateSecurity: {
      handlers: {
        basicAuth: validate,
      },
    },
  },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
