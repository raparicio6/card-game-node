const Game = require('../../app/models/game');
const Player = require('../../app/models/player');
const Monster = require('../../app/models/monster');
const Turn = require('../../app/models/turn');
const HealCard = require('../../app/models/healCard');
const HorrorCard = require('../../app/models/horrorCard');
const ShieldCard = require('../../app/models/shieldCard');
const DamageCard = require('../../app/models/damageCard');
const errors = require('../../app/errors');

describe('Game', () => {
  let game = null;
  let player = null;
  let monster = null;
  beforeEach(done => {
    player = new Player('Fred');
    monster = new Monster();
    game = new Game(1, player, monster);
    return done();
  });

  it('game id is 1', () => {
    expect(game.id).toBe(1);
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
  it('getCurrentTurn returns last added turn', () => {
    const turn1 = new Turn();
    const turn2 = new Turn();
    const turn3 = new Turn();
    game.addTurn(turn1);
    game.addTurn(turn2);
    game.addTurn(turn3);
    expect(game.getCurrentTurn()).toBe(turn3);
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
      for (let i = 1; i <= 12; i++) {
        game.addTurn(new Turn());
      }
      expect(game.winner).toBe(monster);
    });
  });

  describe('playing turns', () => {
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
      it('playPlayerTurn with cardCanBePlayed true and a card is not played', () => {
        const playerTurn = new Turn(player);
        game.addTurn(playerTurn);
        try {
          game.playPlayerTurn();
        } catch (error) {
          expect(error).toStrictEqual(errors.cardWasNotPlayedError());
        }
      });
      it('playPlayerTurn with cardCanBePlayed true and a card not in hand is played', () => {
        const healCard = new HealCard(player, 5);
        const playerTurn = new Turn(player);
        game.addTurn(playerTurn);
        try {
          game.playPlayerTurn(healCard);
        } catch (error) {
          expect(error).toStrictEqual(errors.cardPlayedIsNotInHandError());
        }
      });
    });
    describe('playMonsterTurn', () => {
      it('playMonsterTurn with cardCanBePlayed true', () => {
        const monsterTurn = new Turn(monster);
        game.addTurn(monsterTurn);
        expect(game.turns.length).toBe(1);
        expect(monster.cardsInHand.length).toBe(0);
        expect(monsterTurn.cardPlayed).toBe(null);
        const cardPlayed = game.playMonsterTurn();
        expect(monsterTurn.cardPlayed).toBe(cardPlayed);
        expect(monster.cardsInHand.length).toBe(0);
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
    });
    it('playNextPlayerAndMonsterTurns no winner', () => {
      const healCard = new HealCard(player, 5);
      player.addCardToHand(healCard);
      const playerTurn = new Turn(player);
      game.addTurn(playerTurn);

      expect(game.turns.length).toBe(1);
      expect(player.cardsInHand.length).toBe(1);
      expect(playerTurn.cardPlayed).toBe(null);
      expect(monster.cardsInHand.length).toBe(0);

      const monsterEffect = game.playNextPlayerAndMonsterTurns(healCard);

      expect(playerTurn.cardPlayed).toBe(healCard);
      expect(player.cardsInHand.length).toBe(1);
      expect(game.turns.length).toBe(3);
      expect([HealCard.name, DamageCard.name, ShieldCard.name, HorrorCard.name]).toContain(
        monsterEffect.constructor.name
      );
      expect(monster.cardsInHand.length).toBe(0);
    });
    it('playNextPlayerAndMonsterTurns wins player', () => {
      const damageCard = new DamageCard(player, 12, monster);
      monster.hp = 10;
      monster.shield = 0;
      player.addCardToHand(damageCard);
      const playerTurn = new Turn(player);
      game.addTurn(playerTurn);

      expect(game.turns.length).toBe(1);
      expect(player.cardsInHand.length).toBe(1);
      expect(playerTurn.cardPlayed).toBe(null);
      expect(monster.cardsInHand.length).toBe(0);

      const monsterEffect = game.playNextPlayerAndMonsterTurns(damageCard);

      expect(playerTurn.cardPlayed).toBe(damageCard);
      expect(player.cardsInHand.length).toBe(0);
      expect(game.turns.length).toBe(2);
      expect(monsterEffect).toBe(null);
      expect(monster.cardsInHand.length).toBe(0);
    });
    it('playNextPlayerAndMonsterTurns wins monster', () => {
      const damageCard = new DamageCard(monster, 11, player);
      player.hp = 8;
      player.shield = 0;
      monster.addCardToHand(damageCard);
      const playerDamageCard = new DamageCard(player, 5, monster);
      player.addCardToHand(playerDamageCard);
      const playerTurn = new Turn(player);
      game.addTurn(playerTurn);

      expect(game.turns.length).toBe(1);
      expect(player.cardsInHand.length).toBe(1);
      expect(playerTurn.cardPlayed).toBe(null);
      expect(monster.cardsInHand.length).toBe(1);

      const monsterEffect = game.playNextPlayerAndMonsterTurns(playerDamageCard);

      expect(playerTurn.cardPlayed).toBe(playerDamageCard);
      expect(player.cardsInHand.length).toBe(0);
      expect(game.turns.length).toBe(3);
      expect(monsterEffect).toBe(damageCard);
      expect(monster.cardsInHand.length).toBe(1);
    });
  });
});
