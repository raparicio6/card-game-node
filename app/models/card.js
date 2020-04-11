const CANNOT_INITIALIZE_MESSAGE = 'Cannot initialize Card class';
const SUBCLASS_MUST_IMPLEMENT_MESSAGE = 'Subclass must implement method';

module.exports = class Card {
  constructor(owner) {
    if (new.target === Card) {
      throw new TypeError(CANNOT_INITIALIZE_MESSAGE);
    }
    this.owner = owner;
  }

  // istanbul ignore next
  get type() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  // eslint-disable-next-line no-unused-vars
  applyEffect(opponentNextTurn) {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  toJSON() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }
};
