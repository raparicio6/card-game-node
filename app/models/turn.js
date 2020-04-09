module.exports = class Turn {
  constructor(entityWhoPlays) {
    this.entityWhoPlays = entityWhoPlays;
    this.cardCanBePlayed = true;
    this.cardPlayed = null;
  }

  toJSON() {
    return {
      entityWhoPlays: this.entityWhoPlays.constructor.name,
      cardCanBePlayed: this.cardCanBePlayed,
      cardPlayed: this.cardPlayed ? JSON.parse(JSON.stringify(this.cardPlayed)) : null
    };
  }
};
