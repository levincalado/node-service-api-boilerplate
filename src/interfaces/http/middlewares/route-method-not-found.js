/* eslint-disable no-unused-vars */
const Status = require('http-status');

module.exports = (req, res, next) => {
  const {
    headers, url, method, client,
    container: { cradle: { utils } },
  } = req;

  const details = {
    userAgent: headers['user-agent'] || '',
    host: headers.host,
    url,
    method,
    remoteAddress: client.remoteAddress || '',
  };

  const response = new utils.ResponseBuilder()
    .addMeta({
      statusCode: 502,
    })
    .addError({
      code: 'ROUTE_METHOD_NOT_FOUND',
      type: 'RouteOrMethodNotFound',
      message: `Invalid Route/Method: ${method} ${url}`,
      details,
    })
    .build();

  if (req.container) {
    const { logger } = req.container.cradle;
    logger.error({ response });
  } else {
    // eslint-disable-next-line no-console
    console.error(response);
  }

  res.status(Status.BAD_GATEWAY).json(response);
};
