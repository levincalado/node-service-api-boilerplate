const User = require('src/domain/user/User');
const { ValidationError } = require('src/domain/error/errors').types;

class CreateUser {
  constructor({ UserRepository, helpers }) {
    this.UserRepository = UserRepository;
    this.helpers = helpers;
  }

  async execute(data) {
    const newUser = new User(data);

    const { valid, errors } = newUser.validate();
    if (!valid) {
      throw new this.helpers.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    return this.UserRepository.add(newUser.toJSON());
  }
}

module.exports = CreateUser;
