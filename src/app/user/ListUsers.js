const Pagination = require('src/domain/Pagination');
const { ValidationError } = require('src/domain/error/errors').types;

class ListUsers {
  constructor({ UserRepository }) {
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const pagination = new Pagination(data);

    const { valid, errors } = pagination.validate();
    if (!valid) {
      throw new this.helpers.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    const { page, itemsPerPage } = pagination.toJSON();

    const offset = (page - 1) * itemsPerPage;

    return this.UserRepository.getAllAndCount({
      limit: itemsPerPage,
      offset,
    });
  }
}

module.exports = ListUsers;
