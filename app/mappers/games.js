const Game = require('../models/game');
const Player = require('../models/player');
const Monster = require('../models/monster');
const CardFactory = require('../models/cardFactory');
const Turn = require('../models/turn');

const PLAYER = 'Player';

const getTurnInstance = (cardCanBePlayed, entityWhoPlaysInstance, cardInstance) => {
  const turnInstance = new Turn(entityWhoPlaysInstance);
  turnInstance.cardCanBePlayed = cardCanBePlayed;
  turnInstance.cardPlayed = cardInstance;
  return turnInstance;
};

const getCardInstance = ({ type, value }, ownerInstance, opponentInstance) =>
  CardFactory.getCardByTypeName(type, ownerInstance, value, opponentInstance);

const getPlayerInstance = player => {
  const playerInstance = new Player(player.name);
  playerInstance.hp = player.hp;
  playerInstance.shield = player.shield;
  return playerInstance;
};

const getMonsterInstance = monster => {
  const monsterInstance = new Monster();
  monsterInstance.hp = monster.hp;
  monsterInstance.shield = monster.shield;
  return monsterInstance;
};

const addCardsToHand = (cards, owner, opponent) =>
  cards.forEach(({ type, value }) => owner.addCardToHand(getCardInstance({ type, value }, owner, opponent)));

exports.mapGameToInstance = game => {
  const player = getPlayerInstance(game.player);
  const monster = getMonsterInstance(game.monster);
  addCardsToHand(game.player.cardsInHand, player, monster);
  addCardsToHand(game.monster.cardsInHand, monster, player);
  const gameInstance = new Game(game.id, player, monster);
  const turns = game.turns.map(({ cardCanBePlayed, entityWhoPlays, cardPlayed }) => {
    const entityWhoPlaysInstance = entityWhoPlays === PLAYER ? player : monster;
    const opponentInstance = entityWhoPlaysInstance === player ? monster : player;
    const cardInstance = cardPlayed
      ? getCardInstance(cardPlayed, entityWhoPlaysInstance, opponentInstance)
      : null;
    return getTurnInstance(cardCanBePlayed, entityWhoPlaysInstance, cardInstance);
  });
  turns.forEach(turn => gameInstance.addTurn(turn));
  return gameInstance;
};
