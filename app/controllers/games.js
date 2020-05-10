const Player = require('../models/player');
const Monster = require('../models/monster');
const Game = require('../models/game');
const CardFactory = require('../models/cardFactory');
const { storeGame, getGame } = require('../services/redis');
const {
  serializeGame,
  serializeEntityCardsInHand,
  serializeEntityStatus,
  serializeStatusAfterTurnOfPlayer
} = require('../serializers/games');
const { mapGameToInstance } = require('../mappers/games');
const errors = require('../errors');

const getGameAndRespond = (gameId, res, next, serializeFunction, params = []) =>
  getGame(gameId)
    .then(game => (game ? res.send(serializeFunction(game, ...params)) : next(errors.gameWasNotFoundError())))
    .catch(error => next(errors.databaseError(error.message)));

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

exports.getGame = (req, res, next) => getGameAndRespond(req.params.gameId, res, next, game => ({ game }));

exports.getEntityCards = (req, res, next) =>
  getGameAndRespond(req.params.gameId, res, next, serializeEntityCardsInHand, [req.query.entity]);

exports.getEntityStatus = (req, res, next) =>
  getGameAndRespond(req.params.gameId, res, next, serializeEntityStatus, [req.query.entity]);

exports.playNextPlayerAndMonsterTurns = (req, res, next) => {
  const cardPlayed = req.body.turn.cardPlayed ? req.body.turn.cardPlayed : null;
  if (cardPlayed && !Player.getNamesOfAllowedCardsTypes().includes(cardPlayed.type)) {
    return next(
      errors.schemaError(
        `Card type not allowed. Allowed cards types are ${Player.getNamesOfAllowedCardsTypes()}`
      )
    );
  }

  return getGame(req.params.gameId)
    .then(game => {
      if (!game) {
        return next(errors.gameWasNotFoundError());
      }
      const gameInstance = mapGameToInstance(game);
      const { player, monster } = gameInstance;

      const playerCardPlayed = cardPlayed
        ? CardFactory.getCardByTypeName(cardPlayed.type, player, cardPlayed.value, monster)
        : null;

      try {
        gameInstance.playPlayerTurn(playerCardPlayed);
      } catch (error) {
        return next(error);
      }

      const statusAfterTurnOfPlayer = serializeStatusAfterTurnOfPlayer(gameInstance);
      const monsterCardPlayed = gameInstance.playMonsterTurn(playerCardPlayed);
      const serializedGame = serializeGame(gameInstance, monsterCardPlayed, statusAfterTurnOfPlayer);
      return storeGame(serializedGame.game).then(() => res.send(serializedGame));
    })
    .catch(error => next(errors.databaseError(error.message)));
};

exports.getMaxNumberOfTurns = (_, res) => res.send({ maxNumberOfTurns: Game.getMaxNumberOfTurns() });
