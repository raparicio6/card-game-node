const Entity = require('./entity');
const {
  DAMAGE_CARD_TYPE_NUMBER,
  HEAL_CARD_TYPE_NUMBER,
  SHIELD_CARD_TYPE_NUMBER,
  PLAYER_MAX_POSSIBLE_CARD_VALUE
} = require('../constants');

const INITIAL_HP = 20;
const MAX_HP = 20;
const INITIAL_SHIELD = 0;
const CARDS_VALUES_WITH_PROBABILITIES = [
  [PLAYER_MAX_POSSIBLE_CARD_VALUE - 4, 0.3],
  [PLAYER_MAX_POSSIBLE_CARD_VALUE - 3, 0.25],
  [PLAYER_MAX_POSSIBLE_CARD_VALUE - 2, 0.2],
  [PLAYER_MAX_POSSIBLE_CARD_VALUE - 1, 0.15],
  [PLAYER_MAX_POSSIBLE_CARD_VALUE, 0.1]
];
const INITIAL_NUMBERS_OF_CARDS_IN_HAND = 4;
const CARD_TYPES_PROBABILITIES = [
  [HEAL_CARD_TYPE_NUMBER, 0.33],
  [SHIELD_CARD_TYPE_NUMBER, 0.33],
  [DAMAGE_CARD_TYPE_NUMBER, 0.34]
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

  wouldBeKilled(damage) {
    return damage >= this.hp + this.shield;
  }
};
