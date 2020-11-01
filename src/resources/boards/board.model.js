const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
