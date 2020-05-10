const request = require('supertest');
const app = require('../../../app');
const { redisClient, storeGame } = require('../../../app/services/redis');
const { game } = require('../../testUtils/schemas/gamesSchemas');

describe('GET /games/:gameId', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushdb();
      await storeGame(game);
      response = await request(app).get(`/games/${game.id}`);
      return done();
    });
    afterAll(done => redisClient.flushdb().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body matches with game object', () => {
      expect(response.body).toMatchObject({ game });
    });
  });

  describe('Response with error', () => {
    describe('Game not exists', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        response = await request(app).get('/games/abcbca');
        return done();
      });

      it('status is 404', () => {
        expect(response.status).toBe(404);
      });
      it('internalCode is game_was_not_found_error', () => {
        expect(response.body.internalCode).toBe('game_was_not_found_error');
      });
      it('message is Game was not found', () => {
        expect(response.body.message).toBe('Game was not found');
      });
    });

    describe('Redis error', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame(game);
        await redisClient.quit();
        response = await request(app).get(`/games/${game.id}`);
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
});

describe('GET /games/:gameId/cards_in_hand', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushdb();
      await storeGame(game);
      response = await request(app)
        .get(`/games/${game.id}/cards_in_hand`)
        .query({ entity: 'player' });
      return done();
    });
    afterAll(done => redisClient.flushdb().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body matches with player cardsInHand in game', () => {
      expect(response.body).toMatchObject({ cardsInHand: game.player.cardsInHand });
    });
  });

  describe('Response with error', () => {
    describe('Game not exists', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        response = await request(app)
          .get('/games/abcbca/cards_in_hand')
          .query({ entity: 'player' });
        return done();
      });

      it('status is 404', () => {
        expect(response.status).toBe(404);
      });
      it('internalCode is game_was_not_found_error', () => {
        expect(response.body.internalCode).toBe('game_was_not_found_error');
      });
      it('message is Game was not found', () => {
        expect(response.body.message).toBe('Game was not found');
      });
    });

    describe('Redis error', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame(game);
        await redisClient.quit();
        response = await request(app)
          .get(`/games/${game.id}/cards_in_hand`)
          .query({ entity: 'player' });
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
});

describe('GET /games/:gameId/status', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushdb();
      await storeGame(game);
      response = await request(app)
        .get(`/games/${game.id}/status`)
        .query({ entity: 'monster' });
      return done();
    });
    afterAll(done => redisClient.flushdb().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body matches with monster status in game', () => {
      expect(response.body).toMatchObject({ hp: game.monster.hp, shield: game.monster.shield });
    });
  });

  describe('Response with error', () => {
    describe('Game not exists', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        response = await request(app)
          .get('/games/abcbca/status')
          .query({ entity: 'monster' });
        return done();
      });

      it('status is 404', () => {
        expect(response.status).toBe(404);
      });
      it('internalCode is game_was_not_found_error', () => {
        expect(response.body.internalCode).toBe('game_was_not_found_error');
      });
      it('message is Game was not found', () => {
        expect(response.body.message).toBe('Game was not found');
      });
    });

    describe('Redis error', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame(game);
        await redisClient.quit();
        response = await request(app)
          .get(`/games/${game.id}/status`)
          .query({ entity: 'monster' });
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
});

describe('GET /games/max_number_of_turns', () => {
  let response = null;
  beforeAll(async done => {
    response = await request(app).get('/games/max_number_of_turns');
    return done();
  });

  it('status is 200', () => {
    expect(response.status).toBe(200);
  });
  it('maxNumberOfTurns is 12', () => {
    expect(response.body).toHaveProperty('maxNumberOfTurns', 12);
  });
});
