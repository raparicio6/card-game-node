const Card = require('./card');
const { HORROR_CARD_TYPE_NAME } = require('../constants');

module.exports = class HorrorCard extends Card {
  get type() {
    return HORROR_CARD_TYPE_NAME;
  }

  applyEffect(opponentNextTurn) {
    opponentNextTurn.cardCanBePlayed = false;
  }

  toJSON() {
    return {
      type: this.type
    };
  }
};
