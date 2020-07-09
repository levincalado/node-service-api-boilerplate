const { expect } = require('chai');
const CreateUser = require('src/app/user/CreateUser');
const { ValidationError } = require('src/domain/error/errors').types;
const helpers = require('src/core-libs/helpers');

describe('App :: User :: CreateUser', () => {
  let createUser;

  context('when user is valid', () => {
    before(() => {
      const MockUsersRepository = {
        add: (user) => Promise.resolve(user),
      };

      createUser = new CreateUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('creates the user', async () => {
      const userData = { name: 'New User' };

      const response = await createUser.execute(userData);
      expect(response.name).to.equal('New User');
    });
  });

  context('when user is invalid', () => {
    before(() => {
      const MockUsersRepository = {
        add: (user) => Promise.resolve(user),
      };

      createUser = new CreateUser({
        UserRepository: MockUsersRepository,
        helpers,
      });
    });

    it('throws an error of type "ValidationError"', async () => {
      const userData = {}; // property "name" is required, therefore invalid

      try {
        await createUser.execute(userData);
      } catch (err) {
        expect(err.name).to.equal(ValidationError);
        expect(err.errorCode).to.equal('VALIDATION_ERROR');
        expect(err.message).to.equal('Validation Error');
        expect(err.details).lengthOf(1);
        expect(err.details[0].message).to.equal('"name" is required');
      }
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockUsersRepository = {
        add: () => Promise.reject(new Error('Some Error')),
      };

      createUser = new CreateUser({
        UserRepository: MockUsersRepository,
      });
    });

    it('throws the error', async () => {
      const userData = { name: 'New User' };

      try {
        await createUser.execute(userData);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
