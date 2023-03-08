const axios = require('axios');
const logger = require('./logger');

const LOGGING_NAME = 'http-client';

const { MOCKOMERCE_URL } = process.env;
const client = axios.create({ baseURL: MOCKOMERCE_URL });

client.interceptors.response.use(
    (response) => {
        logger.logInfo(
            LOGGING_NAME,
            `↳ Received response ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} ${response.statusText}`
        );
        return response;
    },
    (error) => {
        const { message, response } = error;
        const data = response?.data || message;
        const status = response?.status || 500;
        if (response) {
            logger.logError(
                LOGGING_NAME,
                `↳ Received response ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} ${
                    response.statusText
                }\n   ${message}`
            );
        } else {
            logger.logError(LOGGING_NAME, `↳ ${message}`);
        }
        return Promise.reject({ error: true, data, status });
    }
);

module.exports = client;
