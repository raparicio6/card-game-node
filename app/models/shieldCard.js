const Card = require('./card');
const { SHIELD_CARD_TYPE_NAME } = require('../constants');

module.exports = class ShieldCard extends Card {
  constructor(owner, value) {
    super(owner);
    this.value = value;
  }

  applyEffect(_) {
    this.owner.shield += this.value;
  }

  getType() {
    return SHIELD_CARD_TYPE_NAME;
  }

  toJSON() {
    return {
      type: this.getType(),
      value: this.value
    };
  }
};
