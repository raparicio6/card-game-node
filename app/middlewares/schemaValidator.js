const { checkSchema, validationResult } = require('express-validator');
const errors = require('../errors');

const checkValidationResult = (req, _, next) => {
  const errorsResult = validationResult(req);
  if (!errorsResult.isEmpty()) {
    return next(
      errors.schemaError([...new Set(errorsResult.array({ onlyFirstError: true }).map(e => e.msg))])
    );
  }
  return next();
};

exports.validateSchema = schema => checkSchema(schema);
exports.validateSchemaAndFail = schema => [exports.validateSchema(schema), checkValidationResult];
