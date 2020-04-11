const { healthCheck, redisHealthCheck } = require('./controllers/healthCheck');
const {
  createGame,
  getGame,
  getEntityCards,
  getEntityStatus,
  playNextPlayerAndMonsterTurns
} = require('./controllers/games');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/redis_health', redisHealthCheck);
  app.get('/games/:gameId/cards_in_hand', getEntityCards);
  app.get('/games/:gameId/status', getEntityStatus);
  app.get('/games/:gameId', getGame);
  app.put('/games/:gameId', playNextPlayerAndMonsterTurns);
  app.post('/games', createGame);
};
