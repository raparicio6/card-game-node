const Game = require('../../app/models/game');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const Turn = require('../../app/models/turn');

describe('Game', () => {
  let game = null;
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    game = new Game(1, player, monster);
    return done();
  });

  it('game id is 1', () => {
    expect(game.id).toBe(1);
  });
  it('game player is player', () => {
    expect(game.player).toBe(player);
  });
  it('game monster is monster', () => {
    expect(game.monster).toBe(monster);
  });
  it('game has 0 turns', () => {
    expect(game.turns.length).toBe(0);
  });
  it('game has 1 turn after adding 1 turn', () => {
    game.addTurn(new Turn());
    expect(game.turns.length).toBe(1);
  });
});
