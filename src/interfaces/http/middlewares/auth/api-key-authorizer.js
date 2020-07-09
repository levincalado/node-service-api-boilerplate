const { Unauthorized } = require('src/domain/error/errors').types;

const { API_KEY } = process.env;

const authorizeMiddleware = async (req, res, next) => {
  const { utils, helpers } = req.container.cradle;

  if (!req.headers['x-api-key']) {
    const error = new helpers.ErrorBuilder(Unauthorized, 'Missing Authorization header');
    next(error);
  }

  try {
    const apiKey = req.headers['x-api-key'];

    if (API_KEY.includes(apiKey)) {
      next();
      return;
    }

    const error = new Error('InvalidAPIKeyError');
    error.name = 'InvalidAPIKeyError';
    throw error;
  } catch (error) {
    let tokenError;

    switch (error.name) {
      case 'InvalidAPIKeyError':
        tokenError = new helpers.ErrorBuilder(Unauthorized, 'Invalid Token Provided');
        break;
      default:
        tokenError = error;
        break;
    }

    next(tokenError);
  }
};

module.exports = authorizeMiddleware;
