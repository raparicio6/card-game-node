const Entity = require('./entity');
const {
  DAMAGE_CARD_TYPE_NUMBER,
  HEAL_CARD_TYPE_NUMBER,
  SHIELD_CARD_TYPE_NUMBER,
  HORROR_CARD_TYPE_NUMBER,
  DAMAGE_CARD_TYPE_NAME,
  HEAL_CARD_TYPE_NAME,
  SHIELD_CARD_TYPE_NAME,
  HORROR_CARD_TYPE_NAME,
  PLAYER_MAX_POSSIBLE_CARD_VALUE
} = require('../constants');

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
  [HEAL_CARD_TYPE_NUMBER, 0.29],
  [SHIELD_CARD_TYPE_NUMBER, 0.29],
  [DAMAGE_CARD_TYPE_NUMBER, 0.29],
  [HORROR_CARD_TYPE_NUMBER, 0.13]
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

  playCard() {
    const nonHorrorSortedCards = this.cardsInHand
      .filter(card => card.getType() !== HORROR_CARD_TYPE_NAME)
      .sort((card1, card2) => card2.value - card1.value);
    const bestDamageCard = nonHorrorSortedCards.find(card => card.getType() === DAMAGE_CARD_TYPE_NAME);
    if (bestDamageCard && bestDamageCard.opponent.wouldBeKilled(bestDamageCard.value)) {
      this.removeCardFromHand(bestDamageCard);
      return bestDamageCard;
    }

    const horrorCards = this.cardsInHand.filter(card => card.getType() === HORROR_CARD_TYPE_NAME);
    if (horrorCards.length) {
      this.removeCardFromHand(horrorCards[0]);
      return horrorCards[0];
    }

    if (PLAYER_MAX_POSSIBLE_CARD_VALUE >= this.hp + this.shield) {
      const bestHealOrShieldCard = nonHorrorSortedCards.find(
        card => card.getType() === SHIELD_CARD_TYPE_NAME || card.getType() === HEAL_CARD_TYPE_NAME
      );
      if (bestHealOrShieldCard) {
        this.removeCardFromHand(bestHealOrShieldCard);
        return bestHealOrShieldCard;
      }
    }

    this.removeCardFromHand(bestDamageCard);
    return bestDamageCard;
  }
};
