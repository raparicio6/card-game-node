const Turn = require('../../app/models/turn');
const Player = require('../../app/models/player');
const HealCard = require('../../app/models/healCard');

describe('Turn', () => {
  let turn = null;
  let player = null;
  let healCard = null;
  beforeEach(done => {
    player = new Player('Fred');
    turn = new Turn(player);
    healCard = new HealCard(player, 5);
    player.addCardToHand(healCard);
    return done();
  });

  it('turn entityWhoPlays is player', () => {
    expect(turn.entityWhoPlays).toBe(player);
  });
  it('turn cardCanBePlayed is true', () => {
    expect(turn.cardCanBePlayed).toBe(true);
  });
  it('turn cardPlayed is null', () => {
    expect(turn.cardPlayed).toBe(null);
  });
  it('turn toJSON with no cardPlayed returns expected json', () => {
    expect(JSON.parse(JSON.stringify(turn))).toMatchObject({
      entityWhoPlays: 'Player',
      cardCanBePlayed: true,
      cardPlayed: null
    });
  });
  it('turn toJSON with cardPlayed returns expected json', () => {
    turn.cardPlayed = healCard;
    expect(JSON.parse(JSON.stringify(turn))).toMatchObject({
      entityWhoPlays: 'Player',
      cardCanBePlayed: true,
      cardPlayed: { type: 'heal', value: 5 }
    });
  });
});
