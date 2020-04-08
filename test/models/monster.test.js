const Monster = require('../../app/models/monster');
const HealCard = require('../../app/models/healCard');

describe('Monster', () => {
  let monster = null;
  beforeEach(done => {
    monster = new Monster();
    return done();
  });

  it('monster hp is 20', () => {
    expect(monster.hp).toBe(20);
  });
  it('monster shield is 10', () => {
    expect(monster.shield).toBe(10);
  });
  it('monster has 0 cards in hand', () => {
    expect(monster.cardsInHand.length).toBe(0);
  });
  it('monster getMaxHp is 20', () => {
    expect(monster.getMaxHp()).toBe(20);
  });
  it('monster getCardsValuesWithProbabilities is [[6, 0.3], [7, 0.25], [8, 0.2], [9, 0.15], [10, 0.1]]', () => {
    expect(monster.getCardsValuesWithProbabilities()).toStrictEqual([
      [6, 0.3],
      [7, 0.25],
      [8, 0.2],
      [9, 0.15],
      [10, 0.1]
    ]);
  });
  it('monster getNumberOfCardsInInitialHand is 4', () => {
    expect(monster.getNumberOfCardsInInitialHand()).toBe(4);
  });
  it('monster getCardTypesProbabilities is [[1, 0.29], [2, 0.29], [3, 0.29], [4, 0.13]]', () => {
    expect(monster.getCardTypesProbabilities()).toStrictEqual([
      [1, 0.29],
      [2, 0.29],
      [3, 0.29],
      [4, 0.13]
    ]);
  });
  it('monster has 1 card in hand after adding 1 card', () => {
    monster.addCardToHand(new HealCard());
    expect(monster.cardsInHand.length).toBe(1);
  });
  it('monster with already max hp gains 0 hp using gainHp with 10', () => {
    expect(monster.hp).toBe(20);
    monster.gainHp(10);
    expect(monster.hp).toBe(20);
  });
  it('monster with 10 hp gains 10 hp using gainHp with 10', () => {
    monster.hp = 10;
    monster.gainHp(10);
    expect(monster.hp).toBe(20);
  });
  it('monster with 0 shield loses 10 hp using takeDamage with 10', () => {
    monster.shield = 0;
    expect(monster.hp).toBe(20);
    monster.takeDamage(10);
    expect(monster.hp).toBe(10);
  });
  it('monster with 10 shield loses 0 hp and 10 shield using takeDamage with 10', () => {
    expect(monster.shield).toBe(10);
    expect(monster.hp).toBe(20);
    monster.takeDamage(10);
    expect(monster.hp).toBe(20);
    expect(monster.shield).toBe(0);
  });
});
