const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ValidationError } = require('../../middleware/errors');
const { StatusCodes } = require('http-status-codes');
const UserRepository = require('../users/user.repository');
const { JWT_SECRET_KEY } = process.env;

const handleLogin = async user => {
  const { login, password } = user;
  if (!(login && password)) {
    throw new ValidationError({
      type: 'Validation error',
      status: StatusCodes.UNAUTHORIZED,
      message: 'Username or password are missing'
    });
  }

  const dbUser = UserRepository.getByProp('login', login);
  if (!dbUser) {
    throw new ValidationError({
      type: 'Validation error',
      status: StatusCodes.UNAUTHORIZED,
      message: 'User does not exist'
    });
  }

  const { hash, _id } = dbUser;
  const isCorrectPassword = await bcrypt.compare(password, hash);
  if (!isCorrectPassword) {
    throw new ValidationError({
      type: 'Validation error',
      status: StatusCodes.UNAUTHORIZED,
      message: 'Authorization failed'
    });
  }

  const token = jwt.sign(
    {
      userId: _id,
      login
    },
    JWT_SECRET_KEY
  );
  return token;
};

module.exports = {
  handleLogin
};
