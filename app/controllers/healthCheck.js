const { redisClient, EXPIRE, THREE_SECONDS } = require('../services/redis');

const REDIS_HEALTH_KEY = 'health';
const REDIS_HEALTH_DEFAULT_VALUE = 'ok';
const REDIS_HEALTH_EXPIRE_TIME = THREE_SECONDS;

exports.healthCheck = (_, res) => res.send({ uptime: process.uptime() });

exports.redisHealthCheck = (_, res) =>
  redisClient
    .set(REDIS_HEALTH_KEY, REDIS_HEALTH_DEFAULT_VALUE, EXPIRE, REDIS_HEALTH_EXPIRE_TIME)
    .then(() => redisClient.get(REDIS_HEALTH_KEY))
    .then(result => res.send({ result }));
