const { JWT_SECRET_KEY } = process.env;
const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('./errors');
const jwt = require('jsonwebtoken');

const authorize = publicRoutes => {
  return (req, res, next) => {
    const { baseUrl, path } = req;
    const hashedRoutes = publicRoutes
      ? publicRoutes.map(item => `${item}/`)
      : [];
    const currentRoute = `${baseUrl}${path}`;
    const isPublicRoute =
      publicRoutes &&
      publicRoutes.length &&
      (publicRoutes.includes(currentRoute) ||
        hashedRoutes.includes(currentRoute));
    if (isPublicRoute) {
      return next();
    }

    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new ValidationError({
        type: 'Validation error',
        status: StatusCodes.UNAUTHORIZED,
        message: 'User is unauthorized'
      });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new ValidationError({
        type: 'Validation error',
        status: StatusCodes.UNAUTHORIZED,
        message: 'User is unauthorized'
      });
    }

    const user = jwt.verify(token, JWT_SECRET_KEY);
    if (!user) {
      throw new ValidationError({
        type: 'Validation error',
        status: StatusCodes.UNAUTHORIZED,
        message: 'User is unauthorized'
      });
    }

    return next();
  };
};

module.exports = authorize;
