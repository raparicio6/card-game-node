const { healthCheck, redisHealthCheck } = require('./controllers/healthCheck');
const {
  createGame,
  getGame,
  getEntityCards,
  getEntityStatus,
  playNextPlayerAndMonsterTurns,
  getMaxNumberOfTurns
} = require('./controllers/games');

exports.init = app => {
  app.get('/health/redis', redisHealthCheck);
  app.get('/health', healthCheck);
  app.get('/games/max_number_of_turns', getMaxNumberOfTurns);
  app.get('/games/:gameId/cards_in_hand', getEntityCards);
  app.get('/games/:gameId/status', getEntityStatus);
  app.get('/games/:gameId', getGame);
  app.put('/games/:gameId', playNextPlayerAndMonsterTurns);
  app.post('/games', createGame);
};
