const Player = require('../models/player');
const Monster = require('../models/monster');
const Game = require('../models/game');
const CardFactory = require('../models/cardFactory');
const { getNewGameId, setGame, getGame } = require('../services/redis');
const { serializeGame, serializeCardsInHand, serializeEntityStatus } = require('../serializers/games');

const addCardsToHand = (owner, opponent) => {
  for (let i = 1; i <= owner.getNumberOfCardsInInitialHand(); i++) {
    owner.addCardToHand(CardFactory.createCard(owner, opponent));
  }
};

exports.createGame = (req, res) => {
  const player = new Player(req.body.game.playerName);
  const monster = new Monster();
  addCardsToHand(player, monster);
  addCardsToHand(monster, player);
  return getNewGameId().then(gameId => {
    const game = new Game(gameId, player, monster);
    const formattedGame = serializeGame(game);
    return setGame(formattedGame.game).then(() => res.status(201).send(formattedGame));
  });
};

exports.getGame = (req, res) => getGame(req.params.gameId).then(game => res.send({ game }));

exports.getEntityCards = (req, res) =>
  getGame(req.params.gameId).then(game => res.send(serializeCardsInHand(game, req.query.entity)));

exports.getEntityStatus = (req, res) =>
  getGame(req.params.gameId).then(game => res.send(serializeEntityStatus(game, req.query.entity)));

exports.playNextTurn = (req, res) => getGame(req.body.turn.gameId).then(game => {});
