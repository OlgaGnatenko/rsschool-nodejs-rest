const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({
    boardId
  });
};

const getById = async id => {
  return Task.findOne({
    _id: id
  });
};

const createTask = async (boardId, task) => {
  return Task.create({
    ...task,
    boardId
  });
};

const updateTask = async (id, task) => {
  const taskToUpdate = JSON.parse(JSON.stringify(task));
  delete taskToUpdate.id;
  return Task.updateOne(
    {
      _id: id
    },
    taskToUpdate
  );
};

const deleteTask = async id => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

const deleteTasksByBoardId = async boardId => {
  const tasks = await Task.find({
    boardId
  });
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i].toObject();
    await deleteTask(task._id);
  }
  return boardId;
};

const unassignTasksByUserId = async userId => {
  const tasks = await Task.find({
    userId
  });
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i].toObject();
    await updateTask(task._id, {
      ...task,
      userId: null
    });
  }
  return userId;
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignTasksByUserId
};
