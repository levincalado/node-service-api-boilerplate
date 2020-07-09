class DeleteUser {
  constructor({ UserRepository }) {
    this.UserRepository = UserRepository;
  }

  async execute(id) {
    return this.UserRepository.remove(id);
  }
}

module.exports = DeleteUser;
