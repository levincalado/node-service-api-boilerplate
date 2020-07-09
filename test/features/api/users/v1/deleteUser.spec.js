const { expect } = require('chai');

const request = require('test/support/request');
const factory = require('test/support/factory');

describe('API :: DELETE /api/v1/users/:id', () => {
  context('when user exists', () => {
    it('deletes the user and return status 202', async () => {
      const user = await factory.create('user', {
        name: 'User',
      });

      await request()
        .delete(`/api/v1/users/${user.id}`)
        .expect(202);
    });
  });

  context('when user does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .delete('/api/v1/users/0')
        .send({
          name: 'Updated User',
        })
        .expect(404);

      expect(body.meta.statusCode).to.equal(404);
      expect(body.error.message).to.equal('Not Found');
      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('users with id 0 can\'t be found.');
    });
  });
});
