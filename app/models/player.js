const Entity = require('./entity');
const { DAMAGE_CARD_TYPE, HEAL_CARD_TYPE, SHIELD_CARD_TYPE } = require('../constants');

const INITIAL_HP = 20;
const MAX_HP = 20;
const INITIAL_SHIELD = 0;
const CARDS_VALUES_WITH_PROBABILITIES = [
  [8, 0.3],
  [9, 0.25],
  [10, 0.2],
  [11, 0.15],
  [12, 0.1]
];
const INITIAL_NUMBERS_OF_CARDS_IN_HAND = 4;
const CARD_TYPES_PROBABILITIES = [
  [HEAL_CARD_TYPE, 0.33],
  [SHIELD_CARD_TYPE, 0.33],
  [DAMAGE_CARD_TYPE, 0.34]
];

module.exports = class Player extends Entity {
  constructor(name) {
    super(INITIAL_HP, INITIAL_SHIELD);
    this.name = name;
  }

  getMaxHp() {
    return MAX_HP;
  }

  getCardsValuesWithProbabilities() {
    return CARDS_VALUES_WITH_PROBABILITIES;
  }

  getNumberOfCardsInInitialHand() {
    return INITIAL_NUMBERS_OF_CARDS_IN_HAND;
  }

  getCardTypesProbabilities() {
    return CARD_TYPES_PROBABILITIES;
  }
};
