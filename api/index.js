const express = require('express');

const router = express.Router();
const usersRouter = require('./users.api');
const messagesRouter = require('./messages.api');

router.use(usersRouter);
router.use(messagesRouter);

module.exports = router;