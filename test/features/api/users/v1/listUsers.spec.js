const { expect } = require('chai');

const request = require('test/support/request');
const factory = require('test/support/factory');

describe('API :: GET /api/v1/users', () => {
  context('when there are users', () => {
    beforeEach(() => {
      factory.createMany('user', 2, [
        { name: 'First' },
        { name: 'Second' },
      ]);
    });

    it('return success with array of users', async () => {
      const { body } = await request()
        .get('/api/v1/users')
        .expect(200);

      expect(body.meta.statusCode).to.equal(200);
      expect(body.meta.message).to.equal('success');
      expect(body.data).to.exist;
      // expect(body.data).to.have.lengthOf(2);

      expect(body.data[0].name).to.equal('First');
      expect(body.data[0]).to.have.all.keys('id', 'name', 'createdAt', 'updatedAt');

      expect(body.data[1].name).to.equal('Second');
      expect(body.data[1]).to.have.all.keys('id', 'name', 'createdAt', 'updatedAt');
    });
  });

  context('when there are no users', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/v1/users')
        .expect(200);

      expect(body.data).to.have.lengthOf(0);
    });
  });
});
