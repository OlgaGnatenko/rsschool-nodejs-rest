const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const createUser = user => usersRepo.createUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = async id => {
  await taskService.unassignTasksByUserId(id);
  return await usersRepo.deleteUser(id);
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
