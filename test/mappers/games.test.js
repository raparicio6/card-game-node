const { mapGameToInstance } = require('../../app/mappers/games');
const { game, getGameInstance } = require('../testUtils/schemas/gamesSchemas');
const Turn = require('../../app/models/turn');
const ShieldCard = require('../../app/models/shieldCard');

describe('mapGameToInstance', () => {
  it('mapGameToInstance matchs with game instance', () => {
    const gameInstance = mapGameToInstance(game);
    expect(gameInstance).toEqual(getGameInstance());
  });

  it('mapGameToInstance matchs with game instance with monster turn', () => {
    const gameWithMonsterTurn = {
      ...game,
      turns: [
        ...game.turns,
        { entityWhoPlays: 'Monster', cardCanBePlayed: true, cardPlayed: { type: 'shield', value: 7 } }
      ]
    };
    const gameInstance = mapGameToInstance(gameWithMonsterTurn);
    const expectedGameInstance = getGameInstance();
    const shieldCard = new ShieldCard(expectedGameInstance.monster, 7);
    const newMonsterTurn = new Turn(expectedGameInstance.monster);
    newMonsterTurn.cardPlayed = shieldCard;
    expectedGameInstance.addTurn(newMonsterTurn);
    expect(gameInstance).toEqual(expectedGameInstance);
  });
});
