const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const createBoard = async board => {
  return Board.create(board);
};

const updateBoard = async (id, board) => {
  return Board.updateOne(
    {
      _id: id
    },
    board
  );
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
