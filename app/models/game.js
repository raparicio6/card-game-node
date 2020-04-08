module.exports = class Game {
  constructor(id, player, monster) {
    this.id = id;
    this.player = player;
    this.monster = monster;
    this.turns = [];
  }

  addTurn(turn) {
    this.turns.push(turn);
  }
};
