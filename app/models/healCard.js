const Card = require('./card');
const { HEAL_CARD_TYPE_NAME } = require('./constants');

module.exports = class HealCard extends Card {
  constructor(owner, value) {
    super(owner);
    this.value = value;
  }

  get type() {
    return HEAL_CARD_TYPE_NAME;
  }

  applyEffect(_) {
    this.owner.gainHp(this.value);
  }

  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
};
