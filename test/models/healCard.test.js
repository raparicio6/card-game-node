const HealCard = require('../../app/models/healCard');
const Player = require('../../app/models/player');

describe('HealCard', () => {
  let healCard = null;
  let player = null;
  beforeEach(done => {
    player = new Player('Fred');
    healCard = new HealCard(player, 5);
    return done();
  });

  it('healCard value is 5', () => {
    expect(healCard.value).toBe(5);
  });
  it('healCard owner is player', () => {
    expect(healCard.owner).toBe(player);
  });
  it('healCard applyEffect changes owner hp from 10 to 15', () => {
    player.hp = 10;
    healCard.applyEffect();
    expect(healCard.owner.hp).toBe(15);
  });
  it('healCard applyEffect changes owner hp from 18 to 20 (max hp)', () => {
    player.hp = 18;
    healCard.applyEffect();
    expect(healCard.owner.hp).toBe(20);
  });
  it('healCard toJSON is { type: heal, value: 5 }', () => {
    expect(JSON.stringify(healCard)).toStrictEqual(JSON.stringify({ type: 'heal', value: 5 }));
  });
});
