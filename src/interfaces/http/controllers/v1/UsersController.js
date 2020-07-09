const { Router } = require('express');

const BaseController = require('src/core-libs/core/BaseController');

class UsersController extends BaseController {
  constructor() {
    super();
    const router = Router();
    router.get('/', this.injector('ListUsers'), this.getAll);
    router.post('/', this.injector('CreateUser'), this.post);
    router.get('/:id', this.injector('ShowUser'), this.get);
    router.put('/:id', this.injector('UpdateUser'), this.put);
    router.delete('/:id', this.injector('DeleteUser'), this.delete);

    return router;
  }
}

module.exports = UsersController;
