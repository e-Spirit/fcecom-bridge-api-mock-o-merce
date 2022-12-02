const axios = require('axios');
const logger = require('../utils/logger');

const { MOCKOMERCE_URL } = process.env;
const client = axios.create({ baseURL: MOCKOMERCE_URL });

client.interceptors.response.use(
    (response) => {
        logger.logInfo(` ↳ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} ${response.statusText}`);
        return response;
    },
    (error) => {
        const { message, response } = error;
        const data = response?.data || message;
        const status = response?.status || 500;
        if (response) {
            logger.logError(
                ` ↳ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} ${
                    response.statusText
                }\n   ${message}`
            );
        } else {
            logger.logError(` ↳ ${message}`);
        }
        return Promise.reject({ error: true, data, status });
    }
);

module.exports = client;
