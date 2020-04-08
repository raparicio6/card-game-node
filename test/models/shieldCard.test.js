const ShieldCard = require('../../app/models/shieldCard');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');

describe('ShieldCard', () => {
  let shieldCard = null;
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    shieldCard = new ShieldCard(player, monster, 5);
    return done();
  });

  it('shieldCard value is 5', () => {
    expect(shieldCard.value).toBe(5);
  });
  it('shieldCard owner is player', () => {
    expect(shieldCard.owner).toBe(player);
  });
  it('shieldCard opponent is monster', () => {
    expect(shieldCard.opponent).toBe(monster);
  });
  it('shieldCard applyEffect changes owner shield from 0 to 5', () => {
    expect(player.shield).toBe(0);
    shieldCard.applyEffect();
    expect(shieldCard.owner.shield).toBe(5);
  });
  it('shieldCard toJSON is { type: shield, value: 5 }', () => {
    expect(JSON.stringify(shieldCard)).toStrictEqual(JSON.stringify({ type: 'shield', value: 5 }));
  });
});
