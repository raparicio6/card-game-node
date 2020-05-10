const request = require('supertest');
const app = require('../../../app');
const { redisClient, storeGame } = require('../../../app/services/redis');
const { game } = require('../../testUtils/schemas/gamesSchemas');

describe('PUT /games/:gameId', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      await redisClient.flushdb();
      await storeGame(game);
      const cardPlayed = game.player.cardsInHand[0];
      response = await request(app)
        .put(`/games/${game.id}`)
        .send({ turn: { cardPlayed } });
      return done();
    });
    afterAll(done => redisClient.flushdb().then(() => done()));

    it('status is 200', () => {
      expect(response.status).toBe(200);
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

  describe('Response with error', () => {
    describe('Playing a card which is not in hand', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame(game);
        const cardPlayed = { type: 'damage', value: '100' };
        response = await request(app)
          .put(`/games/${game.id}`)
          .send({ turn: { cardPlayed } });
        return done();
      });
      afterAll(done => redisClient.flushdb().then(() => done()));

      it('status is 400', () => {
        expect(response.status).toBe(400);
      });
      it('internalCode is card_played_is_not_in_hand_error', () => {
        expect(response.body.internalCode).toBe('card_played_is_not_in_hand_error');
      });
      it('message is Card played is not in hand', () => {
        expect(response.body.message).toBe('Card played is not in hand');
      });
    });

    describe('Not playing a card in a turn a card can be played', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame(game);
        response = await request(app)
          .put(`/games/${game.id}`)
          .send({ turn: {} });
        return done();
      });
      afterAll(done => redisClient.flushdb().then(() => done()));

      it('status is 400', () => {
        expect(response.status).toBe(400);
      });
      it('internalCode is card_was_not_played_error', () => {
        expect(response.body.internalCode).toBe('card_was_not_played_error');
      });
      it('message is Card was not played in a turn that a card can be played', () => {
        expect(response.body.message).toBe('Card was not played in a turn that a card can be played');
      });
    });

    describe('Game not exists', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        const cardPlayed = game.player.cardsInHand[0];
        response = await request(app)
          .put('/games/abcbca')
          .send({ turn: { cardPlayed } });
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

    describe('Game already finished', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame({ ...game, monster: { ...game.monster, hp: 0 } });
        const cardPlayed = game.player.cardsInHand[0];
        response = await request(app)
          .put(`/games/${game.id}`)
          .send({ turn: { cardPlayed } });
        return done();
      });

      it('status is 403', () => {
        expect(response.status).toBe(403);
      });
      it('internalCode is game_is_already_finished_error', () => {
        expect(response.body.internalCode).toBe('game_is_already_finished_error');
      });
      it('message is Game is already finished', () => {
        expect(response.body.message).toBe('Game is already finished');
      });
    });

    describe('Card not allowed', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app)
          .put(`/games/${game.id}`)
          .send({ turn: { cardPlayed: { type: 'wrong type!', value: 5 } } });
        return done();
      });

      it('status is 422', () => {
        expect(response.status).toBe(422);
      });
      it('internalCode is schema_error', () => {
        expect(response.body.internalCode).toBe('schema_error');
      });
      it('message is Card type not allowed. Allowed cards types are damage,heal,shield', () => {
        expect(response.body.message).toBe(
          'Card type not allowed. Allowed cards types are damage,heal,shield'
        );
      });
    });

    describe('Redis error', () => {
      let response = null;
      beforeAll(async done => {
        await redisClient.flushdb();
        await storeGame(game);
        await redisClient.quit();
        const cardPlayed = game.player.cardsInHand[0];
        response = await request(app)
          .put(`/games/${game.id}`)
          .send({ turn: { cardPlayed } });
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
