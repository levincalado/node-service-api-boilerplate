
const dataFaker = require('../../../support/dataFaker');

module.exports = {
  up(queryInterface) {
    const testUsers = [];

    for (let i = 0; i < 20; i += 1) {
      testUsers.push({
        name: dataFaker.name(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('users', testUsers, {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
