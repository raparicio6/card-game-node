module.exports = class Turn {
  constructor(entityWhoPlays) {
    this.entityWhoPlays = entityWhoPlays;
    this.cardCanBePlayed = true;
    this.cardPlayed = null;
  }
};
