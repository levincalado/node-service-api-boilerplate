/* istanbul ignore next */

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const {
    logger, utils, helpers, config,
  } = req.container.cradle;

  let error = err;

  if (!(err instanceof helpers.ErrorBuilder) && typeof err !== 'string') {
    error = new helpers.ErrorBuilder(err);
  }
  const {
    statusCode, errorCode, message, details, stack, name,
  } = error;

  const response = new utils.ResponseBuilder()
    .addMeta({
      statusCode,
    })
    .addError({
      code: errorCode,
      type: name,
      message,
      details,
    })
    .build();

  if (config.env !== 'production') {
    response.error.stack = stack;
  }

  if (config.env !== 'test') {
    logger.error(response);
  }

  res.status(statusCode).json(response);
};
