const { NOT_FOUND } = require('http-status-codes');
const { ValidationError } = require('../../middleware/errors');
const router = require('express').Router();
const tasksService = require('./task.service');

router
  .get('/', async (req, res) => {
    const tasks = await tasksService.getAll(req.boardId);
    res.status(200).json(tasks);
  })
  .get('/:taskId', async (req, res) => {
    const task = await tasksService.getById(req.params.taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'Task not found'
      });
    }
  })
  .post('/', async (req, res) => {
    const task = await tasksService.createTask(req.boardId, req.body);
    res.status(200).json(task);
  })
  .put('/:id', async (req, res) => {
    const task = await tasksService.updateTask(req.params.id, req.body);
    if (task) {
      res.status(200).json(task);
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'Task not found'
      });
    }
  })
  .delete('/:id', async (req, res) => {
    const task = await tasksService.deleteTask(req.params.id);
    if (task) {
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
