const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const createBoard = board => boardsRepo.createBoard(board);
const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);
const deleteBoard = async id => {
  await taskService.deleteTasksByBoardId(id);
  return await boardsRepo.deleteBoard(id);
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
