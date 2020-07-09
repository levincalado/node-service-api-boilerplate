const { Unauthorized, TokenExpiredError, JsonWebTokenError } = require('src/domain/error/errors').types;

const { REGION, COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;
const PUBLIC_KEY_URL = `https://cognito-idp.${REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`;
const RECOGNIZED_ISSUER = `https://cognito-idp.${REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;

const authorizeMiddleware = async (req, res, next) => {
  const { utils, helpers } = req.container.cradle;

  if (!req.headers.authorization) {
    const error = new helpers.ErrorBuilder(Unauthorized, 'Missing Authorization header');
    next(error);
  }

  try {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    const decoded = await utils.jwtUtil.verifyWithJWKS(token, PUBLIC_KEY_URL);

    const {
      aud, iss,
      client_id: clientId,
      token_use: tokenUse,
    } = decoded;

    if (
      (clientId === COGNITO_APP_CLIENT_ID
        || aud === COGNITO_APP_CLIENT_ID)
      && iss === RECOGNIZED_ISSUER
      && tokenUse === 'access') {
      next();
      return;
    }

    const error = new Error('InvalidTokenError');
    error.name = 'InvalidTokenError';
    throw error;
  } catch (error) {
    let tokenError;

    switch (error.name) {
      case 'InvalidTokenError':
        tokenError = new helpers.ErrorBuilder(Unauthorized, 'Invalid Token Provided');
        break;
      case 'JsonWebTokenError':
        tokenError = new helpers.ErrorBuilder(JsonWebTokenError, 'Unrecognized Token Provided');
        break;
      case 'TokenExpiredError':
        tokenError = new helpers.ErrorBuilder(TokenExpiredError, 'Token Expired');
        break;
      default:
        tokenError = error;
        break;
    }

    next(tokenError);
  }
};

module.exports = authorizeMiddleware;
