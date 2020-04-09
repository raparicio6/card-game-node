const { serializeGame, serializeCardsInHand, serializeEntityStatus } = require('../../app/serializers/games');
const { game } = require('../testUtils/schemas/gamesSchemas');
const Game = require('../../app/models/game');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const HealCard = require('../../app/models/healCard');
const ShieldCard = require('../../app/models/shieldCard');
const DamageCard = require('../../app/models/damageCard');
const HorrorCard = require('../../app/models/horrorCard');

describe('serializeGame', () => {
  let serializedGame = null;
  beforeAll(done => {
    const player = new Player('Fred');
    const monster = new Monster();
    const healCard = new HealCard(player, 8);
    const shieldCard = new ShieldCard(player, 9);
    const damageCard = new DamageCard(monster, 10, player);
    const horrorCard = new HorrorCard(monster);
    player.addCardToHand(healCard);
    player.addCardToHand(shieldCard);
    monster.addCardToHand(damageCard);
    monster.addCardToHand(horrorCard);
    const gameInstance = new Game(11131, player, monster);
    serializedGame = serializeGame(gameInstance);
    return done();
  });

  it('serializedGame matchs with game schema', () => {
    expect(serializedGame).toMatchObject({ game });
  });
});

describe('serializeCardsInHand', () => {
  it('player serializedCardsInHand matchs with player cardsInHand in game', () => {
    const serializedCardsInHand = serializeCardsInHand(game, 'player');
    expect(serializedCardsInHand).toMatchObject({ cardsInHand: game.player.cardsInHand });
  });
  it('monster serializedCardsInHand matchs with monster cardsInHand in game', () => {
    const serializedCardsInHand = serializeCardsInHand(game, 'monster');
    expect(serializedCardsInHand).toMatchObject({ cardsInHand: game.monster.cardsInHand });
  });
});

describe('serializeEntityStatus', () => {
  it('player serializedStatus matchs with player status in game', () => {
    const serializedStatus = serializeEntityStatus(game, 'player');
    expect(serializedStatus).toMatchObject({ hp: game.player.hp, shield: game.player.shield });
  });
  it('monster serializedStatus matchs with monster status in game', () => {
    const serializedStatus = serializeEntityStatus(game, 'monster');
    expect(serializedStatus).toMatchObject({ hp: game.monster.hp, shield: game.monster.shield });
  });
});
