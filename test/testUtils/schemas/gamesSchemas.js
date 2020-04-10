const Game = require('../../../app/models/game');
const Player = require('../../../app/models/player');
const Monster = require('../../../app/models/monster');
const HealCard = require('../../../app/models/healCard');
const HorrorCard = require('../../../app/models/horrorCard');
const DamageCard = require('../../../app/models/damageCard');
const ShieldCard = require('../../../app/models/shieldCard');
const Turn = require('../../../app/models/turn');

exports.game = {
  id: 11131,
  turns: [{ entityWhoPlays: 'Player', cardCanBePlayed: true, cardPlayed: null }],
  player: {
    name: 'Fred',
    hp: 20,
    shield: 0,
    cardsInHand: [
      {
        type: 'heal',
        value: 8
      },
      {
        type: 'shield',
        value: 9
      }
    ]
  },
  monster: {
    hp: 20,
    shield: 10,
    cardsInHand: [
      {
        type: 'damage',
        value: 10
      },
      {
        type: 'horror'
      }
    ]
  },
  monsterEffect: {},
  winner: null
};

exports.getGameInstance = (monster = null, player = null) => {
  const playerr = player ? player : new Player('Fred');
  const monsterr = monster ? monster : new Monster();
  const healCard = new HealCard(playerr, 8);
  const shieldCard = new ShieldCard(playerr, 9);
  const damageCard = new DamageCard(monsterr, 10, playerr);
  const horrorCard = new HorrorCard(monsterr);
  playerr.addCardToHand(healCard);
  playerr.addCardToHand(shieldCard);
  monsterr.addCardToHand(damageCard);
  monsterr.addCardToHand(horrorCard);
  const gameInstance = new Game(11131, playerr, monsterr);
  const turn = new Turn(playerr);
  gameInstance.addTurn(turn);
  return gameInstance;
};
