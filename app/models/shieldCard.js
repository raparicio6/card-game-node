const Card = require('./card');

const TYPE_NAME = 'shield';

module.exports = class ShieldCard extends Card {
  constructor(owner, opponent, value) {
    super(owner, opponent);
    this.value = value;
  }

  applyEffect(_) {
    this.owner.shield += this.value;
  }

  toJSON() {
    return {
      type: TYPE_NAME,
      value: this.value
    };
  }
};
