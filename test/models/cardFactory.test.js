const CardFactory = require('../../app/models/cardFactory');
const HealCard = require('../../app/models/healCard');
const DamageCard = require('../../app/models/damageCard');
const ShieldCard = require('../../app/models/shieldCard');
const HorrorCard = require('../../app/models/horrorCard');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');

describe('CardFactory', () => {
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    return done();
  });

  describe('createCard', () => {
    it('createCard for player', () => {
      const card = CardFactory.createCard(player, monster);
      expect([HealCard.name, DamageCard.name, ShieldCard.name]).toContain(card.constructor.name);
    });
    it('createCard for monster', () => {
      const card = CardFactory.createCard(monster, player);
      expect([HealCard.name, DamageCard.name, ShieldCard.name, HorrorCard.name]).toContain(
        card.constructor.name
      );
    });
  });

  describe('getCardByTypeName', () => {
    it('getCardByTypeName heal card', () => {
      const healCard = CardFactory.getCardByTypeName('heal', player, 5);
      const expectedCard = new HealCard(player, 5);
      expect(healCard.constructor.name).toBe(expectedCard.constructor.name);
      expect(healCard.owner).toBe(expectedCard.owner);
      expect(healCard.value).toBe(expectedCard.value);
    });
    it('getCardByTypeName shield card', () => {
      const shieldCard = CardFactory.getCardByTypeName('shield', player, 5);
      const expectedCard = new ShieldCard(player, 5);
      expect(shieldCard.constructor.name).toBe(expectedCard.constructor.name);
      expect(shieldCard.owner).toBe(expectedCard.owner);
      expect(shieldCard.value).toBe(expectedCard.value);
    });
    it('getCardByTypeName damage card', () => {
      const damageCard = CardFactory.getCardByTypeName('damage', player, 5, monster);
      const expectedCard = new DamageCard(player, 5, monster);
      expect(damageCard.constructor.name).toBe(expectedCard.constructor.name);
      expect(damageCard.owner).toBe(expectedCard.owner);
      expect(damageCard.value).toBe(expectedCard.value);
      expect(damageCard.opponent).toBe(expectedCard.opponent);
    });
    it('getCardByTypeName horror card', () => {
      const horrorCard = CardFactory.getCardByTypeName('horror', monster);
      const expectedCard = new HorrorCard(monster);
      expect(horrorCard.constructor.name).toBe(expectedCard.constructor.name);
      expect(horrorCard.owner).toBe(expectedCard.owner);
    });
  });
});
