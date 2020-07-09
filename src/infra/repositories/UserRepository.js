const BaseRepository = require('src/core-libs/core/BaseRepository');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }
}

module.exports = UserRepository;
