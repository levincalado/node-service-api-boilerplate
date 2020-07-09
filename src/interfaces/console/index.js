process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const container = require('src/container');
const Console = require('./Console');

Console.start({
  expose: { container },
});
