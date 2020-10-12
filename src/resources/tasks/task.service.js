const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getById = id => tasksRepo.getById(id);
const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);
const updateTask = (id, task) => tasksRepo.updateTask(id, task);
const deleteTask = id => tasksRepo.deleteTask(id);
const deleteTasksByBoardId = boardId => tasksRepo.deleteTasksByBoardId(boardId);
const unassignTasksByUserId = userId => tasksRepo.unassignTasksByUserId(userId);

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignTasksByUserId
};
