const Player = require('../../app/models/player');
const HealCard = require('../../app/models/healCard');

describe('Player', () => {
  let player = null;
  beforeEach(done => {
    player = new Player('Fred');
    return done();
  });

  it('player name is Fred', () => {
    expect(player.name).toBe('Fred');
  });
  it('player hp is 20', () => {
    expect(player.hp).toBe(20);
  });
  it('player shield is 0', () => {
    expect(player.shield).toBe(0);
  });
  it('player has 0 cards in hand', () => {
    expect(player.cardsInHand.length).toBe(0);
  });
  it('player getMaxHp is 20', () => {
    expect(player.getMaxHp()).toBe(20);
  });
  it('player getCardsValuesWithProbabilities is [[8, 0.3], [9, 0.25], [10, 0.2], [11, 0.15], [12, 0.1]]', () => {
    expect(player.getCardsValuesWithProbabilities()).toStrictEqual([
      [8, 0.3],
      [9, 0.25],
      [10, 0.2],
      [11, 0.15],
      [12, 0.1]
    ]);
  });
  it('player getNumberOfCardsInInitialHand is 4', () => {
    expect(player.getNumberOfCardsInInitialHand()).toBe(4);
  });
  it('player getCardTypesProbabilities is [[1, 0.33], [2, 0.33], [3, 0.34]]', () => {
    expect(player.getCardTypesProbabilities()).toStrictEqual([
      [1, 0.33],
      [2, 0.33],
      [3, 0.34]
    ]);
  });
  it('player has 1 card in hand after adding 1 card', () => {
    player.addCardToHand(new HealCard());
    expect(player.cardsInHand.length).toBe(1);
  });
  it('player with already max hp gains 0 hp using gainHp with 10', () => {
    expect(player.hp).toBe(20);
    player.gainHp(10);
    expect(player.hp).toBe(20);
  });
  it('player with 10 hp gains 10 hp using gainHp with 10', () => {
    player.hp = 10;
    player.gainHp(10);
    expect(player.hp).toBe(20);
  });
  it('player with 0 shield loses 10 hp using takeDamage with 10', () => {
    expect(player.shield).toBe(0);
    expect(player.hp).toBe(20);
    player.takeDamage(10);
    expect(player.hp).toBe(10);
  });
  it('player with 10 shield loses 0 hp and 10 shield using takeDamage with 10', () => {
    player.shield = 10;
    expect(player.hp).toBe(20);
    player.takeDamage(10);
    expect(player.hp).toBe(20);
    expect(player.shield).toBe(0);
  });
});
