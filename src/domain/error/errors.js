const Status = require('http-status');

const errors = {

  // Default Errors
  ValidationError: {
    statusCode: Status.BAD_REQUEST,
    errorCode: 'VALIDATION_ERROR',
  },
  InternalServerError: {
    statusCode: Status.INTERNAL_SERVER_ERROR,
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'The server failed to handle this request',
  },
  NotFoundError: {
    statusCode: Status.NOT_FOUND,
    errorCode: 'NOT_FOUND',
  },

  // Cognito or Auth Exceptions
  InvalidParameterException: {
    statusCode: Status.BAD_REQUEST,
    errorCode: 'VALIDATION_ERROR',
  },
  UserNotConfirmedException: {
    statusCode: Status.UNAUTHORIZED,
    errorCode: 'UNVERIFIED_LOGIN',
  },
  NotAuthorizedException: {
    statusCode: Status.FORBIDDEN,
    errorCode: 'INVALID_CREDENTIALS',
  },
  CodeMismatchException: {
    statusCode: Status.UNAUTHORIZED,
    errorCode: 'VERIFICATION_INVALID',
  },
  UserNotFoundException: {
    statusCode: Status.NOT_FOUND,
    errorCode: 'NOT_FOUND',
  },
  UsernameExistsException: {
    statusCode: Status.CONFLICT,
    errorCode: 'ALREADY_EXISTS',
  },
  JsonWebTokenError: {
    statusCode: Status.UNAUTHORIZED,
    errorCode: 'TOKEN_INVALID',
  },
  TokenExpiredError: {
    statusCode: Status.UNAUTHORIZED,
    errorCode: 'TOKEN_EXPIRED',
  },
  UserSessionExpiredException: {
    statusCode: Status.UNAUTHORIZED,
    errorCode: 'SESSION_EXPIRED',
  },
};

module.exports.config = errors;
module.exports.types = Object.keys(errors).reduce((acc, val) => {
  acc[val] = val;
  return acc;
}, {});
