const Player = require('../../app/models/player');
const HealCard = require('../../app/models/healCard');
const ShieldCard = require('../../app/models/shieldCard');
const DamageCard = require('../../app/models/damageCard');

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
  it('player maxHp is 20', () => {
    expect(player.maxHp).toBe(20);
  });
  it('player cardsValuesWithProbabilities is [[8, 0.3], [9, 0.25], [10, 0.2], [11, 0.15], [12, 0.1]]', () => {
    expect(player.cardsValuesWithProbabilities).toStrictEqual([
      [8, 0.3],
      [9, 0.25],
      [10, 0.2],
      [11, 0.15],
      [12, 0.1]
    ]);
  });
  it('player numberOfCardsInInitialHand is 4', () => {
    expect(player.numberOfCardsInInitialHand).toBe(4);
  });
  it('player cardsTypesProbabilities is [[1, 0.2], [2, 0.3], [3, 0.5]]', () => {
    expect(player.cardsTypesProbabilities).toStrictEqual([
      [1, 0.2],
      [2, 0.3],
      [3, 0.5]
    ]);
  });
  it('player has 1 card in hand after adding 1 card', () => {
    player.addCardToHand(new HealCard());
    expect(player.cardsInHand.length).toBe(1);
  });
  it('player with 1 card has 0 cards in hand after removing the card', () => {
    const healCard = new HealCard();
    player.addCardToHand(healCard);
    expect(player.cardsInHand.length).toBe(1);
    player.removeCardFromHand(healCard);
    expect(player.cardsInHand.length).toBe(0);
  });
  it('player with 2 cards has 1 card in hand after removing 1 card', () => {
    const healCard = new HealCard(player, 5);
    const healCard2 = new HealCard(player, 8);
    player.addCardToHand(healCard);
    player.addCardToHand(healCard2);
    expect(player.cardsInHand.length).toBe(2);
    player.removeCardFromHand(healCard);
    expect(player.cardsInHand.length).toBe(1);
    expect(player.cardsInHand[0].value).toBe(8);
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
  it('player with 5 shield loses 5 hp and 5 shield using takeDamage with 10', () => {
    player.shield = 5;
    expect(player.hp).toBe(20);
    player.takeDamage(10);
    expect(player.hp).toBe(15);
    expect(player.shield).toBe(0);
  });
  it('wouldBeKilled is true with player with 5 hp and 0 shield and 8 of damage', () => {
    player.hp = 5;
    player.shield = 0;
    expect(player.wouldBeKilled(8)).toBe(true);
  });
  it('wouldBeKilled is true with player with 5 hp and 0 shield and 5 of damage', () => {
    player.hp = 5;
    player.shield = 0;
    expect(player.wouldBeKilled(5)).toBe(true);
  });
  it('wouldBeKilled is false with player with 4 hp and 2 shield and 5 of damage', () => {
    player.hp = 4;
    player.shield = 2;
    expect(player.wouldBeKilled(5)).toBe(false);
  });
  it('wouldBeKilled is false with player with 4 hp and 2 shield and 5 of damage', () => {
    player.hp = 4;
    player.shield = 2;
    expect(player.wouldBeKilled(5)).toBe(false);
  });

  describe('hasCard', () => {
    it('has searched card returns true', () => {
      const healCard = new HealCard(player, 5);
      const healCard2 = new HealCard(player, 8);
      const shieldCard = new ShieldCard(player, 5);
      const damageCard = new DamageCard(player, 5);
      player.addCardToHand(healCard);
      player.addCardToHand(healCard2);
      player.addCardToHand(shieldCard);
      player.addCardToHand(damageCard);
      expect(player.hasCard(healCard2)).toBe(true);
    });
    it('does not have searched card returns false', () => {
      const healCard = new HealCard(player, 5);
      const healCard2 = new HealCard(player, 8);
      const shieldCard = new ShieldCard(player, 5);
      const damageCard = new DamageCard(player, 5);
      player.addCardToHand(healCard);
      player.addCardToHand(shieldCard);
      player.addCardToHand(damageCard);
      expect(player.hasCard(healCard2)).toBe(false);
    });
  });

  describe('wasKilled', () => {
    it('player with 0 hp was killed', () => {
      player.hp = 0;
      expect(player.wasKilled()).toBe(true);
    });
    it('player with 1 hp was not killed', () => {
      player.hp = 1;
      expect(player.wasKilled()).toBe(false);
    });
    it('player with -5 hp was killed', () => {
      player.hp = -5;
      expect(player.wasKilled()).toBe(true);
    });
  });
});
