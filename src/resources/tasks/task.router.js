const { NOT_FOUND } = require('http-status-codes');
const { ValidationError } = require('../../middleware/errors');
const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router
  .get('/', async (req, res) => {
    console.log(req.boardId, req.params.taskId);
    const tasks = await tasksService.getAll(req.boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  })
  .get('/:id', async (req, res) => {
    console.log(req.boardId, req.params.id);
    const task = await tasksService.getById(req.params.id);
    if (task) {
      res.status(200).json(Task.toResponse(task));
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
    res.status(200).json(Task.toResponse(task));
  })
  .put('/:id', async (req, res) => {
    const task = await tasksService.updateTask(req.params.id, req.body);
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'Task not found'
      });
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.deleteTask(req.params.id);
    if (task) {
      res.status(204).send(id);
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'User not found'
      });
    }
  });

module.exports = router;
