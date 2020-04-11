const Redis = require('ioredis');
const config = require('../../config').common;

const THREE_SECONDS = 3;
const THREE_HOURS = 10800;
const EXPIRE = 'EX';

const LAST_GAME_NUMBER_ID_KEY = 'lastGameNumberId';
const INITIAL_GAME_NUMBER_ID = 0;

const GAME_EXPIRE_TIME = THREE_HOURS;

const redisClient = new Redis({
  port: config.redis.port || 6379,
  host: config.redis.host || 'localhost',
  password: config.redis.password,
  db: parseInt(config.redis.name)
});

const storeLastGameNumberId = id => redisClient.set(LAST_GAME_NUMBER_ID_KEY, id);

const getLastGameNumberId = () =>
  redisClient.get(LAST_GAME_NUMBER_ID_KEY).then(async result => {
    if (!result) {
      await storeLastGameNumberId(INITIAL_GAME_NUMBER_ID);
    }
    return result || INITIAL_GAME_NUMBER_ID;
  });

const getNewGameNumberId = () =>
  getLastGameNumberId().then(lastGameNumberId => {
    const newGameNumberId = parseInt(lastGameNumberId) + 1;
    return storeLastGameNumberId(newGameNumberId).then(() => newGameNumberId);
  });

const storeGame = game => redisClient.set(game.id, JSON.stringify(game), EXPIRE, GAME_EXPIRE_TIME);

const getGame = gameId => redisClient.get(gameId).then(JSON.parse);

module.exports = { redisClient, getNewGameNumberId, storeGame, getGame, THREE_SECONDS, EXPIRE };
