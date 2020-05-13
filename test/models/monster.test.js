const Monster = require('../../app/models/monster');
const HealCard = require('../../app/models/healCard');
const Player = require('../../app/models/player');
const ShieldCard = require('../../app/models/shieldCard');
const DamageCard = require('../../app/models/damageCard');
const HorrorCard = require('../../app/models/horrorCard');

describe('Monster', () => {
  let monster = null;
  beforeEach(done => {
    monster = new Monster();
    return done();
  });

  it('monster hp is 20', () => {
    expect(monster.hp).toBe(20);
  });
  it('monster shield is 5', () => {
    expect(monster.shield).toBe(5);
  });
  it('monster has 0 cards in hand', () => {
    expect(monster.cardsInHand.length).toBe(0);
  });
  it('monster maxHp is 20', () => {
    expect(monster.maxHp).toBe(20);
  });
  it('monster cardsValuesWithProbabilities is [[6, 0.3], [7, 0.25], [8, 0.2], [9, 0.15], [10, 0.1]]', () => {
    expect(monster.cardsValuesWithProbabilities).toStrictEqual([
      [6, 0.3],
      [7, 0.25],
      [8, 0.2],
      [9, 0.15],
      [10, 0.1]
    ]);
  });
  it('monster numberOfCardsInInitialHand is 4', () => {
    expect(monster.numberOfCardsInInitialHand).toBe(4);
  });
  it('monster cardsTypesProbabilities is [[1, 0.15], [2, 0.15], [3, 0.5], [4, 0.2]]', () => {
    expect(monster.cardsTypesProbabilities).toStrictEqual([
      [1, 0.15],
      [2, 0.15],
      [3, 0.5],
      [4, 0.2]
    ]);
  });

  describe('addCardToHand and removeCardFromHand methods', () => {
    it('monster has 1 card in hand after adding 1 card', () => {
      monster.addCardToHand(new HealCard());
      expect(monster.cardsInHand.length).toBe(1);
    });
    it('monster with 1 card has 0 cards in hand after removing the card', () => {
      const healCard = new HealCard();
      monster.addCardToHand(healCard);
      expect(monster.cardsInHand.length).toBe(1);
      monster.removeCardFromHand(healCard);
      expect(monster.cardsInHand.length).toBe(0);
    });
    it('monster with 2 cards has 1 card in hand after removing 1 card', () => {
      const healCard = new HealCard(monster, 5);
      const healCard2 = new HealCard(monster, 8);
      monster.addCardToHand(healCard);
      monster.addCardToHand(healCard2);
      expect(monster.cardsInHand.length).toBe(2);
      monster.removeCardFromHand(healCard);
      expect(monster.cardsInHand.length).toBe(1);
      expect(monster.cardsInHand[0].value).toBe(8);
    });
    it('monster with 2 cards including horror card has 1 card in hand after removing 1 horror card', () => {
      const healCard = new HealCard(monster, 5);
      const horrorCard = new HorrorCard(monster);
      monster.addCardToHand(healCard);
      monster.addCardToHand(horrorCard);
      expect(monster.cardsInHand.length).toBe(2);
      monster.removeCardFromHand(horrorCard);
      expect(monster.cardsInHand.length).toBe(1);
    });
  });

  describe('gainHp', () => {
    it('monster with already max hp gains 0 hp using gainHp with 10', () => {
      monster.hp = 20;
      monster.gainHp(10);
      expect(monster.hp).toBe(20);
    });
    it('monster with 10 hp gains 10 hp using gainHp with 10', () => {
      monster.hp = 10;
      monster.gainHp(10);
      expect(monster.hp).toBe(20);
    });
  });

  describe('wasKilled', () => {
    it('monster with 0 hp was killed', () => {
      monster.hp = 0;
      expect(monster.wasKilled()).toBe(true);
    });
    it('monster with 1 hp was not killed', () => {
      monster.hp = 1;
      expect(monster.wasKilled()).toBe(false);
    });
    it('monster with -5 hp was killed', () => {
      monster.hp = -5;
      expect(monster.wasKilled()).toBe(true);
    });
  });

  describe('takeDamage', () => {
    it('monster with 0 shield loses 10 hp using takeDamage with 10', () => {
      monster.shield = 0;
      monster.hp = 20;
      monster.takeDamage(10);
      expect(monster.hp).toBe(10);
    });
    it('monster with 10 shield loses 0 hp and 10 shield using takeDamage with 10', () => {
      monster.shield = 10;
      monster.hp = 20;
      monster.takeDamage(10);
      expect(monster.hp).toBe(20);
      expect(monster.shield).toBe(0);
    });
    it('monster with 5 shield loses 5 hp and 5 shield using takeDamage with 10', () => {
      monster.shield = 5;
      monster.hp = 20;
      monster.takeDamage(10);
      expect(monster.hp).toBe(15);
      expect(monster.shield).toBe(0);
    });
  });

  describe('playCard', () => {
    let player = null;
    let healCard = null;
    let shieldCard = null;
    let horrorCard = null;
    let bestDamageCard = null;
    let otherDamageCard = null;
    beforeEach(done => {
      player = new Player('Fred');
      healCard = new HealCard(monster, 7);
      shieldCard = new ShieldCard(monster, 5);
      horrorCard = new HorrorCard(monster);
      bestDamageCard = new DamageCard(monster, 5, player);
      otherDamageCard = new DamageCard(monster, 1, player);
      monster.addCardToHand(healCard);
      monster.addCardToHand(shieldCard);
      monster.addCardToHand(horrorCard);
      monster.addCardToHand(bestDamageCard);
      monster.addCardToHand(otherDamageCard);
      return done();
    });

    it('opponent has less hp than best damage card returns best damage card', () => {
      player.hp = 6;
      bestDamageCard.value = 7;
      expect(monster.playCard()).toBe(bestDamageCard);
    });
    it('opponent has equal hp as best damage card returns best damage card', () => {
      player.hp = 6;
      bestDamageCard.value = 6;
      expect(monster.playCard()).toBe(bestDamageCard);
    });
    it('opponent has more hp than best damage card returns horror card', () => {
      player.hp = 15;
      expect(monster.playCard()).toBe(horrorCard);
    });
    it('opponent has more hp than best damage card with no horror card and hp is less than 12 and shield is 0 returns best between shield or heal cards', () => {
      monster.removeCardFromHand(horrorCard);
      player.hp = 20;
      monster.hp = 11;
      monster.shield = 0;
      expect(monster.playCard()).toBe(healCard);
    });
    it('opponent has more hp than best damage card with no horror card and hp is 12 and shield is 0 returns best between shield or heal cards', () => {
      monster.removeCardFromHand(horrorCard);
      player.hp = 20;
      monster.hp = 12;
      monster.shield = 0;
      expect(monster.playCard()).toBe(healCard);
    });
    it('opponent has more hp than best damage card with no horror card and hp is 1 and shield is less than 11 returns best between shield or heal cards', () => {
      monster.removeCardFromHand(horrorCard);
      player.hp = 20;
      monster.hp = 1;
      monster.shield = 10;
      shieldCard.value = 10;
      expect(monster.playCard()).toBe(shieldCard);
    });
    it('opponent has more hp than best damage card with no horror card and hp is 1 and shield is 11 returns best between shield or heal cards', () => {
      monster.removeCardFromHand(horrorCard);
      player.hp = 20;
      monster.hp = 1;
      monster.shield = 11;
      shieldCard.value = 10;
      expect(monster.playCard()).toBe(shieldCard);
    });
    it('opponent has more hp than best damage card with no horror card and hp is more than 12 and shield is 0 returns best damage card', () => {
      monster.removeCardFromHand(horrorCard);
      player.hp = 20;
      monster.hp = 20;
      monster.shield = 0;
      expect(monster.playCard()).toBe(bestDamageCard);
    });
    it('opponent has more hp than best damage card with no horror, shield or heal cards and hp is 12 and shield is 0 returns best damage card', () => {
      monster.removeCardFromHand(horrorCard);
      monster.removeCardFromHand(shieldCard);
      monster.removeCardFromHand(healCard);
      player.hp = 20;
      monster.hp = 12;
      monster.shield = 0;
      expect(monster.playCard()).toBe(bestDamageCard);
    });
    it('opponent has more hp than best damage card with no horror, shield or heal cards and hp is less than 12 and shield is 0 returns best damage card', () => {
      monster.removeCardFromHand(horrorCard);
      monster.removeCardFromHand(shieldCard);
      monster.removeCardFromHand(healCard);
      player.hp = 20;
      monster.hp = 11;
      monster.shield = 0;
      expect(monster.playCard()).toBe(bestDamageCard);
    });
    it('opponent has more hp than best damage card with no horror or damage cards and hp is more than 12 and shield is 0 returns best shield or heal', () => {
      monster.removeCardFromHand(horrorCard);
      monster.removeCardFromHand(bestDamageCard);
      monster.removeCardFromHand(otherDamageCard);
      monster.hp = 15;
      monster.shield = 0;
      expect(monster.playCard()).toBe(healCard);
    });
  });
});
