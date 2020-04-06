const { healthCheck, redisHealthCheck } = require('./controllers/healthCheck');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/redis_health', redisHealthCheck);
};
