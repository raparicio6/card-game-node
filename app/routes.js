const { healthCheck, redisHealthCheck } = require('./controllers/healthCheck');
const { createGame } = require('./controllers/games');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/redis_health', redisHealthCheck);
  app.post('/games', createGame);
};
