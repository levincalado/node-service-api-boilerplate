require('module').Module._initPaths();

const container = require('src/container');

const server = container.resolve('server');

server.start().catch((error) => {
  server.logger.error(error.stack);
  process.exit();
});
