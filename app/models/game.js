const CardFactory = require('./cardFactory');
const Turn = require('./turn');
const errors = require('../errors');

const MAX_TURNS = 12;

const addCardsToHand = (owner, opponent, entityDrawsCard) => {
  for (let i = 1; i <= owner.getNumberOfCardsInInitialHand(); i++) {
    entityDrawsCard(owner, opponent);
  }
};

module.exports = class Game {
  constructor(id, player, monster) {
    this.id = id;
    this.player = player;
    this.monster = monster;
    this.turns = [];
  }

  prepareFirstTurn() {
    addCardsToHand(this.player, this.monster, this.entityDrawsCard);
    addCardsToHand(this.monster, this.player, this.entityDrawsCard);
    this.addTurn(new Turn(this.player));
    this.entityDrawsCard(this.player, this.monster);
  }

  addTurn(turn) {
    this.turns.push(turn);
  }

  getCurrentTurn() {
    return this.turns[this.turns.length - 1];
  }

  get winner() {
    if (this.monster.wasKilled()) {
      return this.player;
    }
    if (this.player.wasKilled() || this.turns.length >= MAX_TURNS) {
      return this.monster;
    }
    return null;
  }

  entityDrawsCard(owner, opponent) {
    owner.addCardToHand(CardFactory.createCard(owner, opponent));
  }

  playPlayerTurn(cardPlayed) {
    const currentTurn = this.getCurrentTurn();
    const monsterNextTurn = new Turn(this.monster);
    if (!currentTurn.cardCanBePlayed) {
      this.addTurn(monsterNextTurn);
      return;
    }

    if (cardPlayed) {
      if (!this.player.hasCard(cardPlayed)) {
        throw errors.cardPlayedIsNotInHandError();
      }

      this.player.removeCardFromHand(cardPlayed);
      currentTurn.cardPlayed = cardPlayed;
      cardPlayed.applyEffect(monsterNextTurn);
    } else {
      throw errors.cardWasNotPlayedError();
    }

    this.addTurn(monsterNextTurn);
  }

  playMonsterTurn() {
    this.entityDrawsCard(this.monster, this.player);

    const currentTurn = this.getCurrentTurn();
    const playerNextTurn = new Turn(this.player);
    if (!currentTurn.cardCanBePlayed) {
      this.addTurn(playerNextTurn);
      return null;
    }

    const cardPlayed = this.monster.playCard();
    currentTurn.cardPlayed = cardPlayed;
    cardPlayed.applyEffect(playerNextTurn);

    this.addTurn(playerNextTurn);
    return cardPlayed;
  }

  playNextPlayerAndMonsterTurns(playerCardPlayed) {
    this.playPlayerTurn(playerCardPlayed);
    if (this.winner) {
      return null;
    }

    const monsterCardPlayed = this.playMonsterTurn();
    if (this.winner) {
      return monsterCardPlayed;
    }

    this.entityDrawsCard(this.player, this.monster);
    return monsterCardPlayed;
  }
};
