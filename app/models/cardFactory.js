const HealCard = require('../models/healCard');
const ShieldCard = require('../models/shieldCard');
const DamageCard = require('../models/damageCard');
const HorrorCard = require('../models/horrorCard');
const chooseNumberByProbabilities = require('../utils/chooseNumberByProbabilities');
const {
  DAMAGE_CARD_TYPE_NUMBER,
  HEAL_CARD_TYPE_NUMBER,
  SHIELD_CARD_TYPE_NUMBER,
  HORROR_CARD_TYPE_NUMBER,
  DAMAGE_CARD_TYPE_NAME,
  HEAL_CARD_TYPE_NAME,
  SHIELD_CARD_TYPE_NAME,
  HORROR_CARD_TYPE_NAME
} = require('../constants');

const numbersWithCardsTypesMap = (owner, value, opponent) => ({
  [HEAL_CARD_TYPE_NUMBER]: new HealCard(owner, value),
  [SHIELD_CARD_TYPE_NUMBER]: new ShieldCard(owner, value),
  [DAMAGE_CARD_TYPE_NUMBER]: new DamageCard(owner, value, opponent),
  [HORROR_CARD_TYPE_NUMBER]: new HorrorCard(owner)
});

const namesWithCardsTypesMap = (owner, value, opponent) => ({
  [HEAL_CARD_TYPE_NAME]: new HealCard(owner, value),
  [SHIELD_CARD_TYPE_NAME]: new ShieldCard(owner, value),
  [DAMAGE_CARD_TYPE_NAME]: new DamageCard(owner, value, opponent),
  [HORROR_CARD_TYPE_NAME]: new HorrorCard(owner)
});

module.exports = class CardFactory {
  static createCard(owner, opponent) {
    const cardValue = chooseNumberByProbabilities(owner.cardsValuesWithProbabilities);
    const cardType = chooseNumberByProbabilities(owner.cardsTypesProbabilities);
    return numbersWithCardsTypesMap(owner, cardValue, opponent)[cardType];
  }

  static getCardByTypeName(cardTypeName, owner, value, opponent) {
    return namesWithCardsTypesMap(owner, value, opponent)[cardTypeName];
  }
};
