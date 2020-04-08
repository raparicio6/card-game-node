const Card = require('./card');

const TYPE_NAME = 'heal';

module.exports = class HealCard extends Card {
  constructor(owner, opponent, value) {
    super(owner, opponent);
    this.value = value;
  }

  applyEffect(_) {
    this.owner.gainHp(this.value);
  }

  toJSON() {
    return {
      type: TYPE_NAME,
      value: this.value
    };
  }
};
