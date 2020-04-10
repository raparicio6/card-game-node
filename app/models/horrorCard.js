const Card = require('./card');
const { HORROR_CARD_TYPE_NAME } = require('../constants');

module.exports = class HorrorCard extends Card {
  applyEffect(opponentNextTurn) {
    opponentNextTurn.cardCanBePlayed = false;
  }

  get type() {
    return HORROR_CARD_TYPE_NAME;
  }

  toJSON() {
    return {
      type: this.type
    };
  }
};
