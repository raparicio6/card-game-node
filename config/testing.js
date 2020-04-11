exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    redis: {
      name: process.env.REDIS_NAME_TEST
    }
  }
};
