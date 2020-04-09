const HorrorCard = require('../../app/models/horrorCard');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const Turn = require('../../app/models/turn');

describe('HorrorCard', () => {
  let horrorCard = null;
  let monster = null;
  beforeEach(done => {
    monster = new Monster();
    horrorCard = new HorrorCard(monster);
    return done();
  });

  it('horrorCard owner is monster', () => {
    expect(horrorCard.owner).toBe(monster);
  });
  it('horrorCard applyEffect set turn cardCanBePlayed to false', () => {
    const player = new Player('Fred');
    const opponentNextTurn = new Turn(player);
    expect(opponentNextTurn.cardCanBePlayed).toBe(true);
    horrorCard.applyEffect(opponentNextTurn);
    expect(opponentNextTurn.cardCanBePlayed).toBe(false);
  });
  it('horrorCard toJSON is { type: horror }', () => {
    expect(JSON.stringify(horrorCard)).toStrictEqual(JSON.stringify({ type: 'horror' }));
  });
});
