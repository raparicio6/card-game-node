const { redisClient, setGame, getNewGameId } = require('../../app/services/redis');
const { game } = require('../testUtils/schemas/gamesSchemas');

describe('Redis service', () => {
  beforeEach(done => redisClient.flushall().then(() => done()));
  afterAll(done => redisClient.flushall().then(() => done()));

  it.only('getNewGameId with no game ids stored is 1', async () => {
    expect(await getNewGameId()).toBe(1);
  });
  it.only('getNewGameId with lastGameId 5 is 6', async () => {
    await redisClient.set('lastGameId', 5);
    expect(await getNewGameId()).toBe(6);
  });
  it.only('setGame stored game properly', async () => {
    await setGame(game);
    const storedGame = await redisClient.get(game.id);
    expect(JSON.parse(storedGame)).toMatchObject(game);
  });
});
