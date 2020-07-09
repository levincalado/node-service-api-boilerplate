const { expect } = require('chai');

const request = require('test/support/request');
const factory = require('test/support/factory');

describe('API :: PUT /api/v1/users/:id', () => {
  context('when user exists', () => {
    context('when sent data is ok', () => {
      it('updates and returns 202 with the updated user', async () => {
        const user = await factory.create('user', {
          name: 'User',
        });

        const { body } = await request()
          .put(`/api/v1/users/${user.id}`)
          .send({
            name: 'Updated User',
          })
          .expect(202);
        expect(body.data.id).to.equal(user.id);
        expect(body.data.name).to.equal('Updated User');
      });
    });

    context('when name is empty', () => {
      it('does update and returns 400 with the validation error', async () => {
        const user = await factory.create('user', {
          name: 'User',
        });
        const { body } = await request()
          .put(`/api/v1/users/${user.id}`)
          .send({
            name: '',
          })
          .expect(400);

        expect(body.meta.statusCode).to.equal(400);
        expect(body.error.message).to.equal('Validation Error');
        expect(body.error.code).to.equal('VALIDATION_ERROR');
        expect(body.error.details).to.have.lengthOf(1);
        expect(body.error.details[0].message).to.equal('"name" is not allowed to be empty');
      });
    });
  });

  context('when user does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .put('/api/v1/users/0')
        .send({
          name: 'Updated User',
        })
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('users with id 0 can\'t be found.');
    });
  });
});
