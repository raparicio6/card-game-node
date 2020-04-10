/* eslint-disable no-unused-vars */
const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DEFAULT_ERROR]: 500,
  [errors.SCHEMA_ERROR]: 422,
  [errors.CARD_PLAYED_IS_NOT_IN_HAND_ERROR]: 400,
  [errors.CARD_WAS_NOT_PLAYED_ERROR]: 400,
  [errors.DATABASE_ERROR]: 503,
  [errors.GAME_WAS_NOT_FOUND]: 404
};

exports.handle = (error, req, res, next) => {
  res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  logger.error(error);
  return res.send({ message: error.message, internalCode: error.internalCode || errors.DEFAULT_ERROR });
};
