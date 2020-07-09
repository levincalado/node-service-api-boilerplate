const morgan = require('morgan');

module.exports = ({ logger }) => morgan('combined', {
  stream: {
    write(message) {
      logger.info(message.slice(0, -1));
    },
  },
});
