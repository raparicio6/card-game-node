const Redis = require('ioredis');
const config = require('../../config').common;
const { LAST_GAME_ID_KEY, EXPIRE, GAME_EXPIRE_TIME } = require('../constants');

const INITIAL_GAME_ID = 0;

const redisClient = new Redis({
  port: config.redis.port || 6379,
  host: config.redis.host || 'localhost',
  password: config.redis.password,
  db: 0
});

const setLastGameId = id => redisClient.set(LAST_GAME_ID_KEY, id);

const getLastGameId = () =>
  redisClient.get(LAST_GAME_ID_KEY).then(async result => {
    if (!result) {
      await setLastGameId(INITIAL_GAME_ID);
    }
    return result || INITIAL_GAME_ID;
  });

const getNewGameId = () =>
  getLastGameId().then(lastGameId => {
    const newGameId = parseInt(lastGameId) + 1;
    return setLastGameId(newGameId).then(() => newGameId);
  });

const setGame = game => redisClient.set(game.id, JSON.stringify(game), EXPIRE, GAME_EXPIRE_TIME);

module.exports = { redisClient, getNewGameId, setGame };
