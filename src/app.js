const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
require('express-async-errors');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const authorize = require('./middleware/authorize');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const publicRoutes = ['/login', '/doc', '/'];

app.use(express.json());
app.use(logger.logRequest);
app.use(authorize(publicRoutes));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/login', loginRouter);

process.on('uncaughtException', err => {
  logger.logError({
    message: err.message || 'Uncaught exception',
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    type: 'Uncaught exception'
  });
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.logError({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    type: 'Unhandled rejection',
    message: JSON.stringify(reason) || 'Unhandled rejection'
  });
});

app.get('*', (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

app.use(errorHandler);

module.exports = app;
