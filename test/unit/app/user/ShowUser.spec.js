const { expect } = require('chai');
const ShowUser = require('src/app/user/ShowUser');

describe('App :: User :: ShowUser', () => {
  let showUser;

  context('when user exists', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getById: (userId) => Promise.resolve({
          id: userId,
          name: 'The User',
        }),
      };

      showUser = new ShowUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('returns a promise with the user when resolved', (done) => {
      const response = showUser.execute({ id: 1 });
      expect(response).to.be.a('promise');
      response.then((user) => {
        expect(user.id).to.equal(1);
        expect(user.name).to.equal('The User');
        done();
      });
    });
  });

  context('when user does not exist', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getById: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      showUser = new ShowUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('throws a NotFoundError', async () => {
      try {
        await showUser.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });
});
