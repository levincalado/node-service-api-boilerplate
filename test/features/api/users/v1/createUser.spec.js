const { expect } = require('chai');

const request = require('test/support/request');

describe('API :: POST /api/v1/users', () => {
  context('when sent data is ok', () => {
    it('creates and returns 200 and the new user', async () => {
      const { body } = await request()
        .post('/api/v1/users')
        .send({
          name: 'New User',
        })
        .expect(200);

      expect(body.meta.statusCode).to.equal(200);
      expect(body.meta.message).to.equal('success');
      expect(body.data.id).to.exist;
      expect(body.data.name).to.equal('New User');
      expect(body.data).to.have.all.keys('id', 'name', 'createdAt', 'updatedAt');
    });
  });

  context('when name is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/v1/users')
        .expect(400);

      expect(body.meta.statusCode).to.equal(400);
      expect(body.error.message).to.equal('Validation Error');
      expect(body.error.code).to.equal('VALIDATION_ERROR');
      expect(body.error.details).to.have.lengthOf(1);
      expect(body.error.details[0].message).to.equal('"name" is required');
    });
  });
});
