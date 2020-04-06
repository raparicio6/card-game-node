const Redis = require('ioredis');
const config = require('../../config').common;

const client = new Redis({
  port: config.redis.port || 6379,
  host: config.redis.host || 'localhost',
  password: config.redis.password,
  db: 0
});

module.exports = client;
