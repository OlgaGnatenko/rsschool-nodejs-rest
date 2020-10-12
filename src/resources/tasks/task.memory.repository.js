const Task = require('./task.model');

let tasks = [
  new Task({
    id: '1fb25d25-96e3-4af0-bf1c-ee126dac610c',
    title: 'Task1',
    order: 10,
    description: 'task 1 description',
    userId: '7fb25d25-96e3-4af0-bf1c-ee126dac610c',
    boardId: '0fb25d25-96e3-4af0-bf1c-ee126dac610c',
    columnId: null
  })
];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getById = async taskId => {
  return tasks.find(task => task.id === taskId);
};

const createTask = async (boardId, task) => {
  const newTask = new Task({ ...task, boardId });
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (id, task) => {
  const originalTask = tasks.find(currentTask => currentTask.id === id);
  if (!originalTask) return null;
  const originalTaskIndex = tasks.indexOf(originalTask);
  tasks[originalTaskIndex] = {
    ...originalTask,
    ...task
  };
  return tasks[originalTaskIndex];
};

const deleteTask = async id => {
  const task = tasks.find(currentUser => currentUser.id === id);
  if (!task) return null;
  const taskIndex = tasks.indexOf(task);
  tasks.splice(taskIndex, 1);
  return task;
};

const deleteTasksByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
  return boardId;
};

const unassignTasksByUserId = async userId => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
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
