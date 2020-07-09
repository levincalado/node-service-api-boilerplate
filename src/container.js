const {
  createContainer,
  Lifetime,
  asClass,
  asValue,
  asFunction,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/middlewares/logger-middleware');

const helpers = require('./core-libs/helpers');
const utils = require('./core-libs/utils');

const logger = require('./infra/logging/logger');
const { DataSources, models } = require('./infra/database/models');

const container = createContainer();

/**
 * Application Layer
 */

container.loadModules(['src/app/**/*.js'], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    formatName: (name) => name.charAt(0).toUpperCase() + name.slice(1),
  },
}); // Operations

/**
 * Domain Layer
 */

/**
 * Infra Layer
 */

// Models
if (models) {
  container.register(
    Object.keys(models).reduce((acc, val) => {
      acc[val] = asValue(models[val]);
      return acc;
    }, {}),
  );
}

// Repositories
container.loadModules(
  ['src/infra/repositories/*.js', '!src/infra/repositories/BaseRepository.js'],
  {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      formatName: (name) => name.charAt(0).toUpperCase() + name.slice(1),
    },
  },
);
// Database/Sequelize instance
container.register({
  database: asValue(DataSources),
});

/**
 * Interface Layer
 */

// Middlewares
container.register({
  loggerMiddleware: asFunction(loggerMiddleware).singleton(),
  containerMiddleware: asValue(scopePerRequest(container)),
});

// Utils, Helpers
container.register({
  utils: asValue(utils),
  helpers: asValue(helpers),
});

/**
 * System
 */
container.register({
  server: asClass(Server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  config: asValue(config),
});


module.exports = container;
