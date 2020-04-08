const HealCard = require('../../app/models/healCard');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');

describe('HealCard', () => {
  let healCard = null;
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    healCard = new HealCard(player, monster, 5);
    return done();
  });

  it('healCard value is 5', () => {
    expect(healCard.value).toBe(5);
  });
  it('healCard owner is player', () => {
    expect(healCard.owner).toBe(player);
  });
  it('healCard opponent is monster', () => {
    expect(healCard.opponent).toBe(monster);
  });
  it('healCard applyEffect changes owner hp from 10 to 15', () => {
    player.hp = 10;
    healCard.applyEffect();
    expect(healCard.owner.hp).toBe(15);
  });
  it('healCard toJSON is { type: heal, value: 5 }', () => {
    expect(JSON.stringify(healCard)).toStrictEqual(JSON.stringify({ type: 'heal', value: 5 }));
  });
});
