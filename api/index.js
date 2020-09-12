const express = require('express');

const router = express.Router();
const messagesRouter = require('./messages.api');
const usersRouter = require('./users.api');
const roomsRouter = require('./rooms.api');
const authRouter = require('./auth.api');

router.use('/api/messages', messagesRouter);
router.use('/api/users', usersRouter);
router.use('/api/rooms', roomsRouter);
router.use('/api/auth', authRouter);

module.exports = router;
