const Entity = require('./entity');
const { DAMAGE_CARD_TYPE, HEAL_CARD_TYPE, SHIELD_CARD_TYPE, HORROR_CARD_TYPE } = require('../constants');

const INITIAL_HP = 20;
const MAX_HP = 20;
const INITIAL_SHIELD = 10;
const CARDS_VALUES_WITH_PROBABILITIES = [
  [6, 0.3],
  [7, 0.25],
  [8, 0.2],
  [9, 0.15],
  [10, 0.1]
];
const INITIAL_NUMBERS_OF_CARDS_IN_HAND = 4;
const CARD_TYPES_PROBABILITIES = [
  [HEAL_CARD_TYPE, 0.29],
  [SHIELD_CARD_TYPE, 0.29],
  [DAMAGE_CARD_TYPE, 0.29],
  [HORROR_CARD_TYPE, 0.13]
];

module.exports = class Monster extends Entity {
  constructor() {
    super(INITIAL_HP, INITIAL_SHIELD);
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
