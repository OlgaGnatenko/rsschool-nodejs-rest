const Board = require('./board.model');

const boards = [
  new Board({
    id: '0fb25d25-96e3-4af0-bf1c-ee126dac610c',
    title: 'Board1',
    columns: [
      {
        title: 'Column1',
        order: 1
      },
      {
        title: 'Column2',
        order: 2
      }
    ]
  })
];

const getAll = async () => {
  return boards;
};

const getById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  const newBoard = new Board(board);
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, board) => {
  const originalBoard = boards.find(currentBoard => currentBoard.id === id);
  if (!originalBoard) return null;
  const originalBoardIndex = boards.indexOf(originalBoard);
  boards[originalBoardIndex] = {
    ...originalBoard,
    ...board
  };
  return boards[originalBoardIndex];
};

const deleteBoard = async id => {
  const board = boards.find(currentBoard => currentBoard.id === id);
  if (!board) return null;
  const boardIndex = boards.indexOf(board);
  boards.splice(boardIndex, 1);
  return board;
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
