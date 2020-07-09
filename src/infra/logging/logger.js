const winston = require('winston');

const { format } = winston;

const { combine, timestamp, json } = format;

module.exports = ({ config }) => {
  const transports = [
    new winston.transports.Console({
      format: combine(timestamp(), json()),
    }),
  ];

  if (config.logging) {
    const { console, file } = config.logging;

    if (console) {
      transports[0] = new winston.transports.Console(console);
    }

    if (file) {
      transports.push(new winston.transports.File(file));
    }
  }

  return winston.createLogger({ transports });
};
