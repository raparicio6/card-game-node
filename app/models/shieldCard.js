const Card = require('./card');
const { SHIELD_CARD_TYPE_NAME } = require('./constants');

module.exports = class ShieldCard extends Card {
  constructor(owner, value) {
    super(owner);
    this.value = value;
  }

  get type() {
    return SHIELD_CARD_TYPE_NAME;
  }

  applyEffect(_) {
    this.owner.shield += this.value;
  }

  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
};
