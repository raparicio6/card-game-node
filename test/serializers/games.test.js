const {
  serializeGame,
  serializeEntityCardsInHand,
  serializeEntityStatus
} = require('../../app/serializers/games');
const { game, getGameInstance } = require('../testUtils/schemas/gamesSchemas');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const DamageCard = require('../../app/models/damageCard');

describe('serializeGame', () => {
  it('serializedGame matchs with game schema', () => {
    const serializedGame = serializeGame(getGameInstance());
    expect(serializedGame).toMatchObject({ game });
  });
  it('serializedGame winner is winner entity name', () => {
    const monster = new Monster();
    monster.hp = 0;
    const serializedGame = serializeGame(getGameInstance(monster));
    expect(serializedGame.game.winner).toBe('Player');
  });
  it('serializedGame monsterEffect is card parameter', () => {
    const player = new Player('Fred');
    const monster = new Monster();
    const card = new DamageCard(monster, 8, player);
    monster.addCardToHand(card);
    const serializedGame = serializeGame(getGameInstance(monster, player), card);
    expect(serializedGame.game.monsterEffect).toMatchObject(JSON.parse(JSON.stringify(card)));
  });
});

describe('serializeEntityCardsInHand', () => {
  it('player serializedCardsInHand matchs with player cardsInHand in game', () => {
    const serializedCardsInHand = serializeEntityCardsInHand(game, 'player');
    expect(serializedCardsInHand).toMatchObject({ cardsInHand: game.player.cardsInHand });
  });
  it('monster serializedCardsInHand matchs with monster cardsInHand in game', () => {
    const serializedCardsInHand = serializeEntityCardsInHand(game, 'monster');
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
