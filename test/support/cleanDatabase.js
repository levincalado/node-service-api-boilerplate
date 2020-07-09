const container = require('src/container');

const database = container.resolve('UserModel');

module.exports = () => database && database.truncate({ cascade: true });
