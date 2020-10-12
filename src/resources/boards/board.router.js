const router = require('express').Router();
const boardsService = require('./board.service');
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
    res.status(200).json(boards);
  })
  .get('/:boardId', async (req, res) => {
    const board = await boardsService.getById(req.params.boardId);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({
        message: 'Board not found'
      });
    }
  })
  .post('/', async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.status(200).json(board);
  })
  .put('/:boardId', async (req, res) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({
        message: 'Board not found'
      });
    }
  })
  .delete('/:boardId', async (req, res) => {
    const board = await boardsService.deleteBoard(req.params.boardId);
    if (board) {
      res.sendStatus(204);
    } else {
      res.status(404).json({
        message: 'Board not found'
      });
    }
  });

module.exports = router;
