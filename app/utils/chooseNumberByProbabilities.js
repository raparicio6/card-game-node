module.exports = probabilities => {
  const random = Math.random();
  let total = 0;
  let hit = null;
  for (let i = 0; i < probabilities.length; i++) {
    if (random > total && random < total + probabilities[i][1]) {
      hit = probabilities[i];
    }
    total += probabilities[i][1];
  }
  return hit[0];
};
