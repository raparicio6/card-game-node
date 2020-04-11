exports.serializeGame = ({ id, player, monster, turns, winner }, monsterCardPlayed = null) => {
  const serializedPlayerCardsInHand = player.cardsInHand.map(card => JSON.parse(JSON.stringify(card)));
  const serializedMonsterCardsInHand = monster.cardsInHand.map(card => JSON.parse(JSON.stringify(card)));
  const serializedTurns = turns.map(turn => JSON.parse(JSON.stringify(turn)));

  return {
    game: {
      id,
      turns: serializedTurns,
      player: {
        name: player.name,
        hp: player.hp,
        shield: player.shield,
        cardsInHand: serializedPlayerCardsInHand
      },
      monster: {
        hp: monster.hp,
        shield: monster.shield,
        cardsInHand: serializedMonsterCardsInHand
      },
      monsterEffect: monsterCardPlayed ? JSON.parse(JSON.stringify(monsterCardPlayed)) : null,
      winner: winner ? winner.constructor.name : null
    }
  };
};

exports.serializeEntityCardsInHand = (game, entity) => ({ cardsInHand: game[entity].cardsInHand });

exports.serializeEntityStatus = (game, entity) => ({ hp: game[entity].hp, shield: game[entity].shield });
