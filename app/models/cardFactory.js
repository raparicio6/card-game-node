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

const numbersWithCardsTypesMap = (owner, opponent, value) => ({
  [HEAL_CARD_TYPE_NUMBER]: new HealCard(owner, value),
  [SHIELD_CARD_TYPE_NUMBER]: new ShieldCard(owner, value),
  [DAMAGE_CARD_TYPE_NUMBER]: new DamageCard(owner, opponent, value),
  [HORROR_CARD_TYPE_NUMBER]: new HorrorCard(owner)
});

const namesWithCardsTypesMap = () => ({
  [HEAL_CARD_TYPE_NAME]: HealCard,
  [SHIELD_CARD_TYPE_NAME]: ShieldCard,
  [DAMAGE_CARD_TYPE_NAME]: DamageCard,
  [HORROR_CARD_TYPE_NAME]: HorrorCard
});

module.exports = class CardFactory {
  static createCard(owner, opponent) {
    const cardValue = chooseNumberByProbabilities(owner.getCardsValuesWithProbabilities());
    const cardType = chooseNumberByProbabilities(owner.getCardTypesProbabilities());
    return numbersWithCardsTypesMap(owner, opponent, cardValue)[cardType];
  }

  static getCardClassByCardTypeName(cardTypeName) {
    return namesWithCardsTypesMap()[cardTypeName];
  }
};
