const User = require('./user.model');

const users = [
  new User({
    id: '7fb25d25-96e3-4af0-bf1c-ee126dac610c',
    name: 'Olga',
    login: 'olga',
    password: 'olga123'
  })
];

const getAll = async () => {
  return users;
};

const getById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, user) => {
  const originalUser = users.find(currentUser => currentUser.id === id);
  if (!originalUser) return null;
  const originalUserIndex = users.indexOf(originalUser);
  users[originalUserIndex] = {
    ...originalUser,
    ...user
  };
  return users[originalUserIndex];
};

const deleteUser = async id => {
  const user = users.find(currentUser => currentUser.id === id);
  if (!user) return null;
  const userIndex = users.indexOf(user);
  users.splice(userIndex, 1);
  return user;
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
