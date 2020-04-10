exports.serializeGame = (gameInstance, monsterCardPlayed = null) => {
  const playerCardsInHand = gameInstance.player.cardsInHand.map(card => JSON.parse(JSON.stringify(card)));
  const monsterCardsInHand = gameInstance.monster.cardsInHand.map(card => JSON.parse(JSON.stringify(card)));
  const turns = gameInstance.turns.map(turn => JSON.parse(JSON.stringify(turn)));

  return {
    game: {
      id: gameInstance.id,
      turns,
      player: {
        name: gameInstance.player.name,
        hp: gameInstance.player.hp,
        shield: gameInstance.player.shield,
        cardsInHand: playerCardsInHand
      },
      monster: {
        hp: gameInstance.monster.hp,
        shield: gameInstance.monster.shield,
        cardsInHand: monsterCardsInHand
      },
      monsterEffect: monsterCardPlayed ? JSON.parse(JSON.stringify(monsterCardPlayed)) : null,
      winner: gameInstance.winner ? gameInstance.winner.constructor.name : null
    }
  };
};

exports.serializeCardsInHand = (game, entity) => ({ cardsInHand: game[entity].cardsInHand });

exports.serializeEntityStatus = (game, entity) => ({ hp: game[entity].hp, shield: game[entity].shield });
