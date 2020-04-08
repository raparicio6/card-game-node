const { healthCheck, redisHealthCheck } = require('./controllers/healthCheck');
const { createGame, getGame } = require('./controllers/games');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/redis_health', redisHealthCheck);
  app.get('/games/:gameId', getGame);
  app.post('/games', createGame);
};
