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
