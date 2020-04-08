const HealCard = require('../models/healCard');
const ShieldCard = require('../models/shieldCard');
const DamageCard = require('../models/damageCard');
const HorrorCard = require('../models/horrorCard');
const chooseNumberByProbabilities = require('../utils/chooseNumberByProbabilities');
const { DAMAGE_CARD_TYPE, HEAL_CARD_TYPE, SHIELD_CARD_TYPE, HORROR_CARD_TYPE } = require('../constants');

const numbersWithCardsTypesMap = (owner, opponent, value) => ({
  [HEAL_CARD_TYPE]: new HealCard(owner, opponent, value),
  [SHIELD_CARD_TYPE]: new ShieldCard(owner, opponent, value),
  [DAMAGE_CARD_TYPE]: new DamageCard(owner, opponent, value),
  [HORROR_CARD_TYPE]: new HorrorCard(owner, opponent)
});

module.exports = class CardFactory {
  static createCard(owner, opponent) {
    const cardValue = chooseNumberByProbabilities(owner.getCardsValuesWithProbabilities());
    const cardType = chooseNumberByProbabilities(owner.getCardTypesProbabilities());
    return numbersWithCardsTypesMap(owner, opponent, cardValue)[cardType];
  }
};
