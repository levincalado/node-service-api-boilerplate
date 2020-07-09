const { expect } = require('chai');

const request = require('test/support/request');
const factory = require('test/support/factory');

describe('API :: GET /api/v1/users/:id', () => {
  context('when user exists', () => {
    it('returns the user and status 200', async () => {
      const user = await factory.create('user', {
        name: 'The User',
      });

      const { body } = await request()
        .get(`/api/v1/users/${user.id}`)
        .expect(200);

      expect(body.meta.statusCode).to.equal(200);
      expect(body.meta.message).to.equal('success');
      expect(body.data.id).to.equal(user.id);
      expect(body.data.name).to.equal('The User');
    });
  });

  context('when user does not exist', () => {
    it('returns a not found error and status 404', async () => {
      const { body } = await request()
        .get('/api/v1/users/0')
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('users with id 0 can\'t be found.');
    });
  });
});
