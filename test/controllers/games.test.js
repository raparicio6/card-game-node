const request = require('supertest');
const app = require('../../app');
const { redisClient, storeGame } = require('../../app/services/redis');
const { game } = require('../testUtils/schemas/gamesSchemas');

describe('POST /games', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushall();
      response = await request(app)
        .post('/games')
        .send({ game: { playerName: 'Fred' } });
      return done();
    });
    afterAll(done => redisClient.flushall().then(() => done()));

    it('status is 201', () => {
      expect(response.status).toBe(201);
    });
    it('response has game property', () => {
      expect(response.body).toHaveProperty('game');
    });
    it('game has id property', () => {
      expect(response.body.game).toHaveProperty('id');
    });
    it('id is number', () => {
      expect(typeof response.body.game.id).toBe('number');
    });
    it('game has turns property', () => {
      expect(response.body.game).toHaveProperty('turns');
    });
    it('turns is array', () => {
      expect(Array.isArray(response.body.game.turns)).toBe(true);
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
      expect(response.body.game.player).toHaveProperty('cardsInHand');
    });
    it('player cardsInHand is array', () => {
      expect(Array.isArray(response.body.game.player.cardsInHand)).toBe(true);
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
      expect(response.body.game.monster).toHaveProperty('cardsInHand');
    });
    it('monster cardsInHand is array', () => {
      expect(Array.isArray(response.body.game.monster.cardsInHand)).toBe(true);
    });
    it('game has monsterEffect property', () => {
      expect(response.body.game).toHaveProperty('monsterEffect');
    });
    it('game has winner property', () => {
      expect(response.body.game).toHaveProperty('winner');
    });
  });
});

describe('GET /games/:gameId', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushall();
      await storeGame(game);
      response = await request(app).get(`/games/${game.id}`);
      return done();
    });
    afterAll(done => redisClient.flushall().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body matchs with game object', () => {
      expect(response.body).toMatchObject({ game });
    });
  });
});

describe('GET /games/:gameId/cards_in_hand', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushall();
      await storeGame(game);
      response = await request(app)
        .get(`/games/${game.id}/cards_in_hand`)
        .query({ entity: 'player' });
      return done();
    });
    afterAll(done => redisClient.flushall().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body matchs with player cardsInHand in game', () => {
      expect(response.body).toMatchObject({ cardsInHand: game.player.cardsInHand });
    });
  });
});

describe('GET /games/:gameId/status', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushall();
      await storeGame(game);
      response = await request(app)
        .get(`/games/${game.id}/status`)
        .query({ entity: 'monster' });
      return done();
    });
    afterAll(done => redisClient.flushall().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body matchs with monster status in game', () => {
      expect(response.body).toMatchObject({ hp: game.monster.hp, shield: game.monster.shield });
    });
  });
});

describe('PUT /turns', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushall();
      await storeGame(game);
      const cardPlayed = game.player.cardsInHand[0];
      response = await request(app)
        .put('/turns')
        .send({ gameId: game.id, turn: { cardPlayed } });
      return done();
    });
    afterAll(done => redisClient.flushall().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response has game property', () => {
      expect(response.body).toHaveProperty('game');
    });
    it('game has id property', () => {
      expect(response.body.game).toHaveProperty('id');
    });
    it('id is number', () => {
      expect(typeof response.body.game.id).toBe('number');
    });
    it('game has turns property', () => {
      expect(response.body.game).toHaveProperty('turns');
    });
    it('turns is array', () => {
      expect(Array.isArray(response.body.game.turns)).toBe(true);
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
      expect(response.body.game.player).toHaveProperty('cardsInHand');
    });
    it('player cardsInHand is array', () => {
      expect(Array.isArray(response.body.game.player.cardsInHand)).toBe(true);
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
      expect(response.body.game.monster).toHaveProperty('cardsInHand');
    });
    it('monster cardsInHand is array', () => {
      expect(Array.isArray(response.body.game.monster.cardsInHand)).toBe(true);
    });
    it('game has monsterEffect property', () => {
      expect(response.body.game).toHaveProperty('monsterEffect');
    });
    it('game has winner property', () => {
      expect(response.body.game).toHaveProperty('winner');
    });
  });
});
