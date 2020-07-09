const { expect } = require('chai');
const UpdateUser = require('src/app/user/UpdateUser');
const helpers = require('src/core-libs/helpers');

describe('App :: User :: UpdateUser', () => {
  let updateUser;

  context('when user exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockUsersRepository = {
          update: (id, data) => Promise.resolve(data),
        };

        updateUser = new UpdateUser({
          UserRepository: MockUsersRepository,
          helpers,
        });
      });

      it('returns a Promise with the updated user upon resolve', (done) => {
        const userData = { name: 'Updated User' };

        const response = updateUser.execute({ id: 1, ...userData });
        expect(response).to.be.a('promise');
        response.then((user) => {
          expect(user.name).to.equal('Updated User');
          done();
        });
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockUsersRepository = {
          update: () => {
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            return Promise.reject(error);
          },
        };

        updateUser = new UpdateUser({
          UserRepository: MockUsersRepository,
          helpers,
        });
      });

      it('throws a ValidationError', async () => {
        const userData = { name: 'New User' };
        try {
          await updateUser.execute(1, userData);
        } catch (error) {
          expect(error.name).to.equal('ValidationError');
        }
      });
    });
  });

  context('when the user does not exist', () => {
    before(() => {
      const MockUsersRepository = {
        update: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      updateUser = new UpdateUser({
        UserRepository: MockUsersRepository,
        helpers,
      });
    });

    it('throws a NotFound error', async () => {
      const userData = { name: 'New User' };

      try {
        await updateUser.execute({ id: 1, ...userData });
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockUsersRepository = {
        update: () => Promise.reject(new Error('Some Error')),
      };

      updateUser = new UpdateUser({
        UserRepository: MockUsersRepository,
        helpers,
      });
    });

    it('throws the error', async () => {
      const userData = { name: 'New User' };

      try {
        await updateUser.execute({ id: 1, ...userData });
      } catch (error) {
        expect(error.message).to.equal('Some Error');
      }
    });
  });
});
