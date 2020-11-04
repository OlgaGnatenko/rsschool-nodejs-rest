const usersRepo = require('./user.repository');
const taskService = require('../tasks/task.service');
const { ValidationError } = require('../../middleware/errors');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { PASSWORD_SECRET_KEY } = process.env;

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const createUser = async user => {
  const { name, login, password } = user;
  if (!(name && login && password)) {
    throw new ValidationError({
      type: 'Validation error',
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'One of the required fields is missing: name, login, password'
    });
  }

  const hash = await bcrypt.hash(password, PASSWORD_SECRET_KEY);
  const userToSave = {
    name,
    login,
    hash
  };

  return usersRepo.createUser(userToSave);
};
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = async id => {
  await taskService.unassignTasksByUserId(id);
  return await usersRepo.deleteUser(id);
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
