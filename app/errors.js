const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.CARD_PLAYED_IS_NOT_IN_HAND_ERROR = 'card_played_is_not_in_hand_error';
exports.cardPlayedIsNotInHandError = () =>
  internalError('Card played is not in hand', exports.CARD_PLAYED_IS_NOT_IN_HAND_ERROR);

exports.CARD_WAS_NOT_PLAYED_ERROR = 'card_was_not_played_error';
exports.cardWasNotPlayedError = () =>
  internalError('Card was not played in a turn that a card can be played', exports.CARD_WAS_NOT_PLAYED_ERROR);
