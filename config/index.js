const ENVIRONMENT = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');

if (ENVIRONMENT !== 'production') dotenv.config();

const config = {
  common: {
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    }
  }
};

module.exports = config;
