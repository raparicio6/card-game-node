const Card = require('./card');
const { DAMAGE_CARD_TYPE_NAME } = require('../constants');

module.exports = class DamageCard extends Card {
  constructor(owner, value, opponent) {
    super(owner);
    this.value = value;
    this.opponent = opponent;
  }

  get type() {
    return DAMAGE_CARD_TYPE_NAME;
  }

  applyEffect(_) {
    this.opponent.takeDamage(this.value);
  }

  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
};
