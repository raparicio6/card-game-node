const { redisClient, setGame, getNewGameId, getGame } = require('../../app/services/redis');
const { game } = require('../testUtils/schemas/gamesSchemas');

describe('Redis service', () => {
  beforeEach(done => redisClient.flushall().then(() => done()));
  afterAll(done => redisClient.flushall().then(() => done()));

  it('getNewGameId with no game ids stored is 1', async () => {
    expect(await getNewGameId()).toBe(1);
  });
  it('getNewGameId with lastGameId 5 is 6', async () => {
    await redisClient.set('lastGameId', 5);
    expect(await getNewGameId()).toBe(6);
  });
  it('setGame stored game properly', async () => {
    await setGame(game);
    const storedGame = await redisClient.get(game.id);
    expect(JSON.parse(storedGame)).toMatchObject(game);
  });
  it('getGame get game properly', async () => {
    await redisClient.set(game.id, JSON.stringify(game));
    const storedGame = await getGame(game.id);
    expect(storedGame).toMatchObject(game);
  });
});
