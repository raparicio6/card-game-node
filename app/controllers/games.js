const Player = require('../models/player');
const Monster = require('../models/monster');
const Game = require('../models/game');
const CardFactory = require('../models/cardFactory');
const { storeGame, getGame } = require('../services/redis');
const { serializeGame, serializeCardsInHand, serializeEntityStatus } = require('../serializers/games');
const { mapGameToInstance } = require('../mappers/games');
const errors = require('../errors');

exports.createGame = (req, res, next) => {
  const player = new Player(req.body.game.playerName);
  const monster = new Monster();
  const gameId = Game.getNewId();
  const game = new Game(gameId, player, monster);
  game.prepareFirstTurn();
  const serializedGame = serializeGame(game);
  return storeGame(serializedGame.game)
    .then(() => res.status(201).send(serializedGame))
    .catch(error => next(errors.databaseError(error.message)));
};

exports.getGame = (req, res, next) =>
  getGame(req.params.gameId)
    .then(game => {
      if (!game) {
        return next(errors.gameWasNotFoundError());
      }
      return res.send({ game });
    })
    .catch(error => next(errors.databaseError(error.message)));

exports.getEntityCards = (req, res, next) =>
  getGame(req.params.gameId)
    .then(game => {
      if (!game) {
        return next(errors.gameWasNotFoundError());
      }
      return res.send(serializeCardsInHand(game, req.query.entity));
    })
    .catch(error => next(errors.databaseError(error.message)));

exports.getEntityStatus = (req, res, next) =>
  getGame(req.params.gameId)
    .then(game => {
      if (!game) {
        return next(errors.gameWasNotFoundError());
      }
      return res.send(serializeEntityStatus(game, req.query.entity));
    })
    .catch(error => next(errors.databaseError(error.message)));

exports.playNextPlayerAndMonsterTurns = (req, res, next) =>
  getGame(req.body.gameId)
    .then(game => {
      if (!game) {
        return next(errors.gameWasNotFoundError());
      }
      const gameInstance = mapGameToInstance(game);
      const { player, monster } = gameInstance;

      const cardPlayed = req.body.turn.cardPlayed ? req.body.turn.cardPlayed : null;
      const playerCardPlayed = cardPlayed
        ? CardFactory.getCardByTypeName(cardPlayed.type, player, cardPlayed.value, monster)
        : null;

      let monsterCardPlayed = null;
      try {
        monsterCardPlayed = gameInstance.playNextPlayerAndMonsterTurns(playerCardPlayed);
      } catch (error) {
        return next(error);
      }
      const serializedGame = serializeGame(gameInstance, monsterCardPlayed);
      return storeGame(serializedGame.game).then(() => res.send(serializedGame));
    })
    .catch(error => next(errors.databaseError(error.message)));
