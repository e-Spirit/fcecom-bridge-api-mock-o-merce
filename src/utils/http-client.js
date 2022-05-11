const axios = require('axios');

const { MOCKOMERCE_URL } = process.env;
const client = axios.create({ baseURL: MOCKOMERCE_URL });

client.interceptors.response.use(
  (response) => {
    console.log(` ↳ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    const { message, response } = (error);
    if (response) {
      console.error(` ↳ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} ${response.statusText}\n   ${message}`);
    } else {
      console.error(` ↳ ${message}`);
    }
    return Promise.resolve({ error: true });
  }
);

module.exports = client;
