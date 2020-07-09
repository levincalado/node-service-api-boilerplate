const User = require('src/domain/user/User');
const { ValidationError } = require('src/domain/error/errors').types;

class UpdateUser {
  constructor({ UserRepository, helpers }) {
    this.UserRepository = UserRepository;
    this.helpers = helpers;
  }

  async execute(data) {
    const { id, ...details } = data;
    const newUser = new User(details);

    const { valid, errors } = newUser.validate();
    if (!valid) {
      throw new this.helpers.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    return this.UserRepository.update(id, details);
  }
}

module.exports = UpdateUser;
