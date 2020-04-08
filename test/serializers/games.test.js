const { formatGame } = require('../../app/serializers/games');
const { game } = require('../testUtils/schemas/gamesSchemas');
const Game = require('../../app/models/game');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const HealCard = require('../../app/models/healCard');
const DamageCard = require('../../app/models/damageCard');

describe('formatGame', () => {
  let formattedGame = null;
  beforeAll(done => {
    const player = new Player('Fred');
    const monster = new Monster();
    const healCard = new HealCard(player, monster, 8);
    const damageCard = new DamageCard(monster, player, 10);
    player.addCardToHand(healCard);
    monster.addCardToHand(damageCard);
    const gameInstance = new Game(11131, player, monster);
    formattedGame = formatGame(gameInstance);
    return done();
  });

  it.only('formattedGame matchs with game schema', () => {
    expect(formattedGame).toMatchObject({ game });
  });
});
