const CANNOT_INITIALIZE_MESSAGE = 'Cannot initialize Entity class';
const SUBCLASS_MUST_IMPLEMENT_MESSAGE = 'Subclass must implement method';

const findCard = (cardsInHand, card) => cardsInHand.find(c => c.type === card.type && card.value === c.value);

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

  removeCardFromHand(card) {
    const cardFound = findCard(this.cardsInHand, card);
    if (cardFound) {
      this.cardsInHand.splice(this.cardsInHand.indexOf(cardFound), 1);
    }
  }

  gainHp(hp) {
    this.hp += hp;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
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

  wasKilled() {
    return this.hp <= 0;
  }

  wouldBeKilled(damage) {
    return damage >= this.hp + this.shield;
  }

  hasCard(card) {
    const cardFound = findCard(this.cardsInHand, card);
    return !!cardFound;
  }

  // istanbul ignore next
  get maxHp() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  get cardsValuesWithProbabilities() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  get numberOfCardsInInitialHand() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }

  // istanbul ignore next
  get cardsTypesProbabilities() {
    throw new TypeError(SUBCLASS_MUST_IMPLEMENT_MESSAGE);
  }
};
