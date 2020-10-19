const { NOT_FOUND } = require('http-status-codes');
const { ValidationError } = require('../../middleware/errors');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .get('/', async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(200).json(users.map(User.toResponse));
  })
  .get('/:id', async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'User not found'
      });
    }
  })
  .post('/', async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(200).json(User.toResponse(user));
  })
  .put('/:id', async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'User not found'
      });
    }
  })
  .delete('/:id', async (req, res) => {
    const user = await usersService.deleteUser(req.params.id);
    if (user) {
      res.sendStatus(204);
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'User not found'
      });
    }
  });

module.exports = router;
