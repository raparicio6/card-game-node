const { redisClient } = require('../services/redis');
const {
  EXPIRE,
  REDIS_HEALTH_EXPIRE_TIME,
  REDIS_HEALTH_KEY,
  REDIS_HEALTH_DEFAULT_VALUE
} = require('../constants');

exports.healthCheck = (_, res) => res.send({ uptime: process.uptime() });

exports.redisHealthCheck = (_, res) =>
  redisClient
    .set(REDIS_HEALTH_KEY, REDIS_HEALTH_DEFAULT_VALUE, EXPIRE, REDIS_HEALTH_EXPIRE_TIME)
    .then(() => redisClient.get(REDIS_HEALTH_KEY))
    .then(result => res.send({ result }));
