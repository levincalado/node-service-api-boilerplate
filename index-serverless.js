/* eslint-disable no-console */
require('module').Module._initPaths();

const serverless = require('serverless-http');

const container = require('src/container');

const app = serverless(container.resolve('server').express);

module.exports.handler = async (event, context) => {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  const requestSource = {
    level: 'info',
    timestamp: new Date(),
    message: {
      sourceIp: event.requestContext.identity.sourceIp,
      userAgent: event.requestContext.identity.userAgent,
      httpMethod: event.httpMethod,
      path: event.path,
    },
  };
  // eslint-disable-next-line no-console
  console.info(JSON.stringify(requestSource));

  try {
    const res = await app(event, context);

    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};
