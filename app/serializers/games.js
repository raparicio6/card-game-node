exports.formatGame = gameInstance => {
  const playerCardsInHand = gameInstance.player.cardsInHand.map(card => JSON.parse(JSON.stringify(card)));
  const monsterCardsInHand = gameInstance.monster.cardsInHand.map(card => JSON.parse(JSON.stringify(card)));

  return {
    game: {
      id: gameInstance.id,
      turns: gameInstance.turns,
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
      }
    }
  };
};
