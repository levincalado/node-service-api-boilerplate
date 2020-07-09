const { expect } = require('chai');
const DeleteUser = require('src/app/user/DeleteUser');

describe('App :: User :: DeleteUser', () => {
  let deleteUser;

  context('when user exists', () => {
    before(() => {
      const MockUsersRepository = {
        remove: () => Promise.resolve(),
      };

      deleteUser = new DeleteUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('returns a promise that deletes the user when resolved', async () => {
      const response = deleteUser.execute();
      expect(response).to.be.a('promise');
    });
  });

  context('when the user does not exist', () => {
    before(() => {
      const MockUsersRepository = {
        remove: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      deleteUser = new DeleteUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('throws a NotFound error', async () => {
      try {
        await deleteUser.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockUsersRepository = {
        remove: () => Promise.reject(new Error('Some Error')),
      };

      deleteUser = new DeleteUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await deleteUser.execute(1);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
