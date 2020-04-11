exports.config = {
  environment: 'development',
  isDevelopment: true,
  common: {
    redis: {
      name: process.env.REDIS_NAME_DEV
    }
  }
};
