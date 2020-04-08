const { healthCheck, redisHealthCheck } = require('./controllers/healthCheck');
const { createGame, getGame, getEntityCards, getEntityStatus } = require('./controllers/games');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/redis_health', redisHealthCheck);
  app.get('/games/:gameId/cards', getEntityCards);
  app.get('/games/:gameId/status', getEntityStatus);
  app.get('/games/:gameId', getGame);
  app.post('/games', createGame);
};
