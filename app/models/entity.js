const CANNOT_INITIALIZE_MESSAGE = 'Cannot initialize Entity class';
const SUBCLASS_MUST_IMPLEMENT_MESSAGE = 'Subclass must implement method';

module.exports = class Entity {
  constructor(hp, shield) {
    if (new.target === Entity) {
      throw new TypeError(CANNOT_INITIALIZE_MESSAGE);
    }
    this.hp = hp;
    this.shield = shield;
    this.cardsInHand = [];
  }

  addCardToHand(card) {
    this.cardsInHand.push(card);
  }

  gainHp(hp) {
    this.hp += hp;
    if (this.hp > this.getMaxHp()) {
      this.hp = this.getMaxHp();
    }
  }

  takeDamage(damage) {
    const damageToHp = damage - this.shield;
    this.shield -= damage;
    if (this.shield <= 0) {
      this.shield = 0;
    }
    if (damageToHp > 0) {
      this.hp -= damageToHp;
    }
  }

  // istanbul ignore next
  getMaxHp() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  getPossibleCardsWithProbabilities() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  getNumberOfCardsInInitialHand() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  getCardTypesProbabilities() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }
};
