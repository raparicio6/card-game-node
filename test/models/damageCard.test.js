const DamageCard = require('../../app/models/damageCard');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');

describe('DamageCard', () => {
  let damageCard = null;
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    damageCard = new DamageCard(player, monster, 5);
    return done();
  });

  it('damageCard value is 5', () => {
    expect(damageCard.value).toBe(5);
  });
  it('damageCard owner is player', () => {
    expect(damageCard.owner).toBe(player);
  });
  it('damageCard opponent is monster', () => {
    expect(damageCard.opponent).toBe(monster);
  });
  it('damageCard applyEffect reduces opponent shield from 10 to 5', () => {
    expect(monster.shield).toBe(10);
    damageCard.applyEffect();
    expect(monster.shield).toBe(5);
  });
  it('damageCard toJSON is { type: damage, value: 5 }', () => {
    expect(JSON.stringify(damageCard)).toStrictEqual(JSON.stringify({ type: 'damage', value: 5 }));
  });
});
