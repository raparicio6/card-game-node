const { v4: uuidv4 } = require('uuid');
const CardFactory = require('./cardFactory');
const Turn = require('./turn');
const errors = require('../errors');

const MAX_NUMBER_OF_TURNS = 16;

const addCardsToHand = (owner, opponent, entityDrawsCard) => {
  for (let i = 1; i <= owner.numberOfCardsInInitialHand; i++) {
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

  get currentTurn() {
    return this.turns.length ? this.turns[this.turns.length - 1] : null;
  }

  get winner() {
    if (this.monster.wasKilled()) {
      return this.player;
    }
    if (this.player.wasKilled() || this.turns.length >= MAX_NUMBER_OF_TURNS) {
      return this.monster;
    }
    return null;
  }

  static getNewId() {
    return uuidv4();
  }

  static getMaxNumberOfTurns() {
    return MAX_NUMBER_OF_TURNS;
  }

  addTurn(turn) {
    this.turns.push(turn);
  }

  prepareFirstTurn() {
    addCardsToHand(this.player, this.monster, this.entityDrawsCard);
    addCardsToHand(this.monster, this.player, this.entityDrawsCard);
    this.addTurn(new Turn(this.player));
    this.entityDrawsCard(this.player, this.monster);
  }

  entityDrawsCard(owner, opponent) {
    owner.addCardToHand(CardFactory.createCard(owner, opponent));
  }

  playPlayerTurn(cardPlayed) {
    if (this.winner) {
      throw errors.gameIsAlreadyFinishedError();
    }

    const monsterNextTurn = new Turn(this.monster);
    if (!this.currentTurn.cardCanBePlayed) {
      this.addTurn(monsterNextTurn);
      return;
    }

    if (cardPlayed) {
      if (!this.player.hasCard(cardPlayed)) {
        throw errors.cardPlayedIsNotInHandError();
      }

      this.player.removeCardFromHand(cardPlayed);
      this.currentTurn.cardPlayed = cardPlayed;
      cardPlayed.applyEffect(monsterNextTurn);
    } else {
      throw errors.cardWasNotPlayedError();
    }

    this.addTurn(monsterNextTurn);
  }

  playMonsterTurn() {
    if (this.winner) {
      return null;
    }

    this.entityDrawsCard(this.monster, this.player);

    const playerNextTurn = new Turn(this.player);
    if (!this.currentTurn.cardCanBePlayed) {
      this.addTurn(playerNextTurn);
      return null;
    }

    const cardPlayed = this.monster.playCard();
    this.currentTurn.cardPlayed = cardPlayed;
    cardPlayed.applyEffect(playerNextTurn);

    this.addTurn(playerNextTurn);
    this.entityDrawsCard(this.player, this.monster);
    return cardPlayed;
  }
};
