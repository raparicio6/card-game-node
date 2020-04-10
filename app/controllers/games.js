const Player = require('../models/player');
const Monster = require('../models/monster');
const Game = require('../models/game');
const CardFactory = require('../models/cardFactory');
const { getNewGameId, storeGame, getGame } = require('../services/redis');
const { serializeGame, serializeCardsInHand, serializeEntityStatus } = require('../serializers/games');
const { mapGameToInstance } = require('../mappers/games');

exports.createGame = (req, res) => {
  const player = new Player(req.body.game.playerName);
  const monster = new Monster();
  return getNewGameId().then(gameId => {
    const game = new Game(gameId, player, monster);
    game.prepareFirstTurn();
    const serializedGame = serializeGame(game);
    return storeGame(serializedGame.game).then(() => res.status(201).send(serializedGame));
  });
};

exports.getGame = (req, res) => getGame(req.params.gameId).then(game => res.send({ game }));

exports.getEntityCards = (req, res) =>
  getGame(req.params.gameId).then(game => res.send(serializeCardsInHand(game, req.query.entity)));

exports.getEntityStatus = (req, res) =>
  getGame(req.params.gameId).then(game => res.send(serializeEntityStatus(game, req.query.entity)));

exports.playNextPlayerAndMonsterTurns = (req, res, next) =>
  getGame(req.body.gameId).then(game => {
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
  });
