const { expect } = require('chai');
const ListUsers = require('src/app/user/ListUsers');

describe('App :: User :: ListUsers', () => {
  let listUsers;

  context('when query is successful', () => {
    before(() => {
      const MockUsersRepository = {
        getAllAndCount: () => Promise.resolve('some users....'),
      };

      listUsers = new ListUsers({
        UserRepository: MockUsersRepository,
      });
    });

    it('returns a promise that returns users when resolved', (done) => {
      const response = listUsers.execute();
      expect(response).to.be.a('promise');
      done();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockUsersRepository = {
        getAllAndCount: () => Promise.reject(new Error('Failed')),
      };

      listUsers = new ListUsers({
        UserRepository: MockUsersRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await listUsers.execute();
      } catch (error) {
        expect(error.message).to.equal('Failed');
      }
    });
  });
});
