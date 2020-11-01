const { NOT_FOUND } = require('http-status-codes');
const { ValidationError } = require('../../middleware/errors');

const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const taskRouter = require('../tasks/task.router');

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

router
  .get('/', async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
  .get('/:boardId', async (req, res, next) => {
    try {
      const board = await boardsService.getById(req.params.boardId);
      if (board) {
        res.status(200).json(Board.toResponse(board));
      } else {
        throw new ValidationError({
          status: NOT_FOUND,
          type: 'Validation error',
          message: 'Board not found'
        });
      }
    } catch (err) {
      return next(err);
    }
  })
  .post('/', async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.status(200).json(Board.toResponse(board));
  })
  .put('/:boardId', async (req, res) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'Board not found'
      });
    }
  })
  .delete('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.deleteBoard(boardId);
    if (board) {
      res.status(204).send(boardId);
    } else {
      throw new ValidationError({
        status: NOT_FOUND,
        type: 'Validation error',
        message: 'Board not found'
      });
    }
  });

module.exports = router;
