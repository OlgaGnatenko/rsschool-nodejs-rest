const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const createUser = async user => {
  return User.create(user);
};

const updateUser = async (id, user) => {
  return User.updateOne(
    {
      _id: id
    },
    user
  );
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const getByProp = async (propKey, propValue) => {
  return User.findOne({
    [propKey]: propValue
  });
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
  getByProp
};
