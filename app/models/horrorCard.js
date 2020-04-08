const Card = require('./card');

const TYPE_NAME = 'horror';

module.exports = class HorrorCard extends Card {
  applyEffect(opponentNextTurn) {
    opponentNextTurn.cardCanBePlayed = false;
  }

  toJSON() {
    return {
      type: TYPE_NAME
    };
  }
};
