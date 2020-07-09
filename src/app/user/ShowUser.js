class ShowUser {
  constructor({ UserRepository }) {
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { id } = data;
    return this.UserRepository.getById(id);
  }
}

module.exports = ShowUser;
