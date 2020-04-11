const { redisClient, storeGame, getNewGameNumberId, getGame } = require('../../app/services/redis');
const { game } = require('../testUtils/schemas/gamesSchemas');

describe('Redis service', () => {
  beforeEach(done => redisClient.flushdb().then(() => done()));
  afterAll(done => redisClient.flushdb().then(() => done()));

  it('getNewGameNumberId with no game ids stored is 1', async () => {
    expect(await getNewGameNumberId()).toBe(1);
  });
  it('getNewGameNumberId with lastGameId 5 is 6', async () => {
    await redisClient.set('lastGameNumberId', 5);
    expect(await getNewGameNumberId()).toBe(6);
  });
  it('storeGame stores game properly', async () => {
    await storeGame(game);
    const storedGame = await redisClient.get(game.id);
    expect(JSON.parse(storedGame)).toMatchObject(game);
  });
  it('getGame get game properly', async () => {
    await redisClient.set(game.id, JSON.stringify(game));
    const storedGame = await getGame(game.id);
    expect(storedGame).toMatchObject(game);
  });
});
