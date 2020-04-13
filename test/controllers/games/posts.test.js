const request = require('supertest');
const app = require('../../../app');
const { redisClient, storeGame } = require('../../../app/services/redis');
const { game } = require('../../testUtils/schemas/gamesSchemas');

describe('POST /games', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushdb();
      response = await request(app)
        .post('/games')
        .send({ game: { playerName: 'Fred' } });
      return done();
    });
    afterAll(done => redisClient.flushdb().then(() => done()));

    it('status is 201', () => {
      expect(response.status).toBe(201);
    });
    it('response has game property', () => {
      expect(response.body).toHaveProperty('game');
    });
    it('game has id property', () => {
      expect(response.body.game).toHaveProperty('id', expect.any(String));
    });
    it('game has turns property', () => {
      expect(response.body.game).toHaveProperty('turns', expect.any(Array));
    });
    it('turns has one element', () => {
      expect(response.body.game.turns.length).toBe(1);
    });
    it('game has player property', () => {
      expect(response.body.game).toHaveProperty('player');
    });
    it('player has name property', () => {
      expect(response.body.game.player).toHaveProperty('name');
    });
    it('player has hp property', () => {
      expect(response.body.game.player).toHaveProperty('hp');
    });
    it('player has shield property', () => {
      expect(response.body.game.player).toHaveProperty('shield');
    });
    it('player has cardsInHand property', () => {
      expect(response.body.game.player).toHaveProperty('cardsInHand', expect.any(Array));
    });
    it('game has monster property', () => {
      expect(response.body.game).toHaveProperty('monster');
    });
    it('monster has hp property', () => {
      expect(response.body.game.monster).toHaveProperty('hp');
    });
    it('monster has shield property', () => {
      expect(response.body.game.monster).toHaveProperty('shield');
    });
    it('monster has cardsInHand property', () => {
      expect(response.body.game.monster).toHaveProperty('cardsInHand', expect.any(Array));
    });
    it('game has monsterEffect property', () => {
      expect(response.body.game).toHaveProperty('monsterEffect');
    });
    it('game has winner property', () => {
      expect(response.body.game).toHaveProperty('winner');
    });
    it('game has statusAfterTurnOfPlayer property', () => {
      expect(response.body.game).toHaveProperty('winner');
    });
    it('game only has mentioned properties', () => {
      const properties = [
        'id',
        'player',
        'monster',
        'turns',
        'winner',
        'monsterEffect',
        'statusAfterTurnOfPlayer'
      ];
      expect(properties).toEqual(expect.arrayContaining(Object.keys(response.body.game)));
    });
  });

  describe('Redis error respond with error', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushdb();
      await storeGame(game);
      await redisClient.quit();
      response = await request(app)
        .post('/games')
        .send({ game: { playerName: 'Fred' } });
      return done();
    });
    afterAll(async done => {
      await redisClient.connect();
      await redisClient.flushdb();
      return done;
    });

    it('status is 503', () => {
      expect(response.status).toBe(503);
    });
    it('internalCode is database_error', () => {
      expect(response.body.internalCode).toBe('database_error');
    });
    it('message is Connection is closed.', () => {
      expect(response.body.message).toBe('Connection is closed.');
    });
  });
});
