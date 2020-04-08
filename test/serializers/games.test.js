const { formatGame, formatCardsInHand, formatEntityStatus } = require('../../app/serializers/games');
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

  it('formattedGame matchs with game schema', () => {
    expect(formattedGame).toMatchObject({ game });
  });
});

describe('formatCardsInHand', () => {
  it('player formattedCards matchs with player cardsInHand in game', () => {
    const formattedCards = formatCardsInHand(game, 'player');
    expect(formattedCards).toMatchObject({ cards: game.player.cardsInHand });
  });
  it('monster formattedCards matchs with monster cardsInHand in game', () => {
    const formattedCards = formatCardsInHand(game, 'monster');
    expect(formattedCards).toMatchObject({ cards: game.monster.cardsInHand });
  });
});

describe('formatEntityStatus', () => {
  it('player formattedStatus matchs with player status in game', () => {
    const formattedStatus = formatEntityStatus(game, 'player');
    expect(formattedStatus).toMatchObject({ hp: game.player.hp, shield: game.player.shield });
  });
  it('monster formattedStatus matchs with monster status in game', () => {
    const formattedStatus = formatEntityStatus(game, 'monster');
    expect(formattedStatus).toMatchObject({ hp: game.monster.hp, shield: game.monster.shield });
  });
});
