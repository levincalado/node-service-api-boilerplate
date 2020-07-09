/* eslint-disable import/no-unresolved */
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

function loadDatabaseConfig() {
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database');
  }

  return undefined;
}

function loadLoggingConfig() {
  if (fs.existsSync(path.join(__dirname, './logging.js'))) {
    return require('./logging')[ENV];
  }

  return undefined;
}

module.exports = {
  db: loadDatabaseConfig(),
  logging: loadLoggingConfig(),
  env: ENV,
  web: {
    port: process.env.PORT || 8000,
  },
};
