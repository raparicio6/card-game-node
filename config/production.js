exports.config = {
  environment: 'production',
  isProduction: true,
  common: {
    redis: {
      name: process.env.REDIS_NAME
    }
  }
};
