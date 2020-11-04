const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('../../middleware/errors');
const router = require('express').Router();
const loginService = require('./login.service');

router.post('/', async (req, res) => {
  const loginResult = await loginService.handleLogin(req.body);
  const { token } = loginResult;
  if (!token) {
    throw new ValidationError({
      type: 'Validation error',
      status: StatusCodes.UNAUTHORIZED,
      message: 'Authorization failed'
    });
    // return res.status(StatusCodes.UNAUTHORIZED).send('Authorization failed');
  }
  res.status(200).json(token);
});

module.exports = router;
