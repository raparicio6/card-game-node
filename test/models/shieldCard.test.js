const ShieldCard = require('../../app/models/shieldCard');
const Player = require('../../app/models/player');

describe('ShieldCard', () => {
  let shieldCard = null;
  let player = null;
  beforeEach(done => {
    player = new Player('Fred');
    shieldCard = new ShieldCard(player, 5);
    return done();
  });

  it('shieldCard value is 5', () => {
    expect(shieldCard.value).toBe(5);
  });
  it('shieldCard owner is player', () => {
    expect(shieldCard.owner).toBe(player);
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
