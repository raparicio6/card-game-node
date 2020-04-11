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

const getPlayerInstance = ({ name, hp, shield }) => {
  const playerInstance = new Player(name);
  playerInstance.hp = hp;
  playerInstance.shield = shield;
  return playerInstance;
};

const getMonsterInstance = ({ hp, shield }) => {
  const monsterInstance = new Monster();
  monsterInstance.hp = hp;
  monsterInstance.shield = shield;
  return monsterInstance;
};

const addCardsToHand = (cards, owner, opponent) =>
  cards.forEach(({ type, value }) => owner.addCardToHand(getCardInstance({ type, value }, owner, opponent)));

exports.mapGameToInstance = ({ id, player, monster, turns }) => {
  const playerInstance = getPlayerInstance(player);
  const monsterInstance = getMonsterInstance(monster);
  addCardsToHand(player.cardsInHand, playerInstance, monsterInstance);
  addCardsToHand(monster.cardsInHand, monsterInstance, playerInstance);
  const gameInstance = new Game(id, playerInstance, monsterInstance);
  const turnsInstances = turns.map(({ cardCanBePlayed, entityWhoPlays, cardPlayed }) => {
    const entityWhoPlaysInstance = entityWhoPlays === PLAYER ? playerInstance : monsterInstance;
    const opponentInstance = entityWhoPlaysInstance === playerInstance ? monsterInstance : playerInstance;
    const cardInstance = cardPlayed
      ? getCardInstance(cardPlayed, entityWhoPlaysInstance, opponentInstance)
      : null;
    return getTurnInstance(cardCanBePlayed, entityWhoPlaysInstance, cardInstance);
  });
  turnsInstances.forEach(turnInstance => gameInstance.addTurn(turnInstance));
  return gameInstance;
};
