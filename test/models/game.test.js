const Game = require('../../app/models/game');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const Turn = require('../../app/models/turn');
const HealCard = require('../../app/models/healCard');
const errors = require('../../app/errors');

describe('Game', () => {
  let game = null;
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    game = new Game('abc123', player, monster);
    return done();
  });

  it('game id is abc123', () => {
    expect(game.id).toBe('abc123');
  });
  it('game player is player', () => {
    expect(game.player).toBe(player);
  });
  it('game monster is monster', () => {
    expect(game.monster).toBe(monster);
  });
  it('game has 0 turns', () => {
    expect(game.turns.length).toBe(0);
  });
  it('game has 1 turn after adding 1 turn', () => {
    game.addTurn(new Turn());
    expect(game.turns.length).toBe(1);
  });
  it('currentTurn returns null if there are no turns', () => {
    game.turns = [];
    expect(game.currentTurn).toBe(null);
  });
  it('currentTurn returns last added turn', () => {
    const turn1 = new Turn();
    const turn2 = new Turn();
    const turn3 = new Turn();
    game.addTurn(turn1);
    game.addTurn(turn2);
    game.addTurn(turn3);
    expect(game.currentTurn).toBe(turn3);
  });

  describe('winner', () => {
    it('monster has 0 hp so player wins', () => {
      monster.hp = 0;
      expect(game.winner).toBe(player);
    });
    it('player has 0 hp so monster wins', () => {
      player.hp = 0;
      expect(game.winner).toBe(monster);
    });
    it('there are 12 turns so monster wins', () => {
      for (let i = 1; i <= 16; i++) {
        game.addTurn(new Turn());
      }
      expect(game.winner).toBe(monster);
    });
  });

  describe('playPlayerTurn', () => {
    it('playPlayerTurn with cardCanBePlayed true and a card is played', () => {
      const healCard = new HealCard(player, 5);
      player.addCardToHand(healCard);
      const playerTurn = new Turn(player);
      game.addTurn(playerTurn);
      expect(game.turns.length).toBe(1);
      expect(player.cardsInHand.length).toBe(1);
      expect(playerTurn.cardPlayed).toBe(null);
      game.playPlayerTurn(healCard);
      expect(playerTurn.cardPlayed).toBe(healCard);
      expect(player.cardsInHand.length).toBe(0);
      expect(game.turns.length).toBe(2);
    });
    it('playPlayerTurn with cardCanBePlayed false and a card is not played', () => {
      const healCard = new HealCard(player, 5);
      player.addCardToHand(healCard);
      const playerTurn = new Turn(player);
      playerTurn.cardCanBePlayed = false;
      game.addTurn(playerTurn);
      expect(game.turns.length).toBe(1);
      expect(player.cardsInHand.length).toBe(1);
      expect(playerTurn.cardPlayed).toBe(null);
      game.playPlayerTurn();
      expect(playerTurn.cardPlayed).toBe(null);
      expect(player.cardsInHand.length).toBe(1);
      expect(game.turns.length).toBe(2);
    });
    it('playPlayerTurn with cardCanBePlayed false and a card is played', () => {
      const healCard = new HealCard(player, 5);
      player.addCardToHand(healCard);
      const playerTurn = new Turn(player);
      playerTurn.cardCanBePlayed = false;
      game.addTurn(playerTurn);
      expect(game.turns.length).toBe(1);
      expect(player.cardsInHand.length).toBe(1);
      expect(playerTurn.cardPlayed).toBe(null);
      game.playPlayerTurn(healCard);
      expect(playerTurn.cardPlayed).toBe(null);
      expect(player.cardsInHand.length).toBe(1);
      expect(game.turns.length).toBe(2);
    });
    it('playPlayerTurn with cardCanBePlayed true and a card is not played throws cardWasNotPlayedError', () => {
      const playerTurn = new Turn(player);
      game.addTurn(playerTurn);
      expect(() => {
        game.playPlayerTurn();
      }).toThrowError(errors.cardWasNotPlayedError());
    });
    it('playPlayerTurn with cardCanBePlayed true and a card not in hand is played throws cardPlayedIsNotInHandError', () => {
      const healCard = new HealCard(player, 5);
      const playerTurn = new Turn(player);
      game.addTurn(playerTurn);
      expect(() => {
        game.playPlayerTurn(healCard);
      }).toThrowError(errors.cardPlayedIsNotInHandError());
    });
    it('playPlayerTurn with game already finished throws gameIsAlreadyFinishedError', () => {
      monster.hp = 0;
      expect(() => {
        game.playPlayerTurn();
      }).toThrowError(errors.gameIsAlreadyFinishedError());
    });
  });

  describe('playMonsterTurn', () => {
    it('playMonsterTurn with cardCanBePlayed true', () => {
      const monsterTurn = new Turn(monster);
      game.addTurn(monsterTurn);
      expect(game.turns.length).toBe(1);
      expect(monster.cardsInHand.length).toBe(0);
      expect(player.cardsInHand.length).toBe(0);
      expect(monsterTurn.cardPlayed).toBe(null);
      const cardPlayed = game.playMonsterTurn();
      expect(monsterTurn.cardPlayed).toBe(cardPlayed);
      expect(monster.cardsInHand.length).toBe(0);
      expect(player.cardsInHand.length).toBe(1);
      expect(game.turns.length).toBe(2);
    });
    it('playMonsterTurn with cardCanBePlayed false', () => {
      const monsterTurn = new Turn(monster);
      monsterTurn.cardCanBePlayed = false;
      game.addTurn(monsterTurn);
      expect(game.turns.length).toBe(1);
      expect(monster.cardsInHand.length).toBe(0);
      expect(monsterTurn.cardPlayed).toBe(null);
      const cardPlayed = game.playMonsterTurn();
      expect(cardPlayed).toBe(null);
      expect(monsterTurn.cardPlayed).toBe(null);
      expect(monster.cardsInHand.length).toBe(1);
      expect(game.turns.length).toBe(2);
    });
    it('playMonsterTurn already having a winner returns null', () => {
      const monsterTurn = new Turn(monster);
      game.addTurn(monsterTurn);
      monster.hp = 0;
      const cardPlayed = game.playMonsterTurn();
      expect(cardPlayed).toBe(null);
    });
  });
});
