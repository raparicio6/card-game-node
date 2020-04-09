const Card = require('./card');
const { DAMAGE_CARD_TYPE_NAME } = require('../constants');

module.exports = class DamageCard extends Card {
  constructor(owner, opponent, value) {
    super(owner);
    this.opponent = opponent;
    this.value = value;
  }

  applyEffect(_) {
    this.opponent.takeDamage(this.value);
  }

  getType() {
    return DAMAGE_CARD_TYPE_NAME;
  }

  toJSON() {
    return {
      type: this.getType(),
      value: this.value
    };
  }
};
