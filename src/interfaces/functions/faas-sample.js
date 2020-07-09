const util = require('util');

const container = require('src/container');

const ListUsers = container.resolve('ListUsers');
const logger = container.resolve('logger');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  // Read options from the event parameter.
  logger.info('Reading options from event:\n', util.inspect(event, { depth: 5 }));

  const data = event;

  try {
    const result = await ListUsers.execute(data);
    logger.info(result);

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
