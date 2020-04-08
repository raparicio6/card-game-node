const Card = require('./card');

const TYPE_NAME = 'damage';

module.exports = class DamageCard extends Card {
  constructor(owner, opponent, value) {
    super(owner, opponent);
    this.value = value;
  }

  applyEffect(_) {
    this.opponent.takeDamage(this.value);
  }

  toJSON() {
    return {
      type: TYPE_NAME,
      value: this.value
    };
  }
};
