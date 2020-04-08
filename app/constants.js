const THREE_SECONDS = 3;
const THREE_HOURS = 10800;

exports.EXPIRE = 'EX';
exports.REDIS_HEALTH_KEY = 'health';
exports.REDIS_HEALTH_DEFAULT_VALUE = 'ok';
exports.REDIS_HEALTH_EXPIRE_TIME = THREE_SECONDS;
exports.LAST_GAME_ID_KEY = 'lastGameId';
exports.GAME_EXPIRE_TIME = THREE_HOURS;

exports.HEAL_CARD_TYPE = 1;
exports.SHIELD_CARD_TYPE = 2;
exports.DAMAGE_CARD_TYPE = 3;
exports.HORROR_CARD_TYPE = 4;
