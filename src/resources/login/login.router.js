const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('../../middleware/errors');
const router = require('express').Router();
const loginService = require('./login.service');

router.post('/', async (req, res) => {
  const token = await loginService.handleLogin(req.body);
  if (!token) {
    throw new ValidationError({
      type: 'Validation error',
      status: StatusCodes.UNAUTHORIZED,
      message: 'Authorization failed'
    });
  }
  res.status(200).json({ token });
});

module.exports = router;
