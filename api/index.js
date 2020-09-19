const express = require('express');

const router = express.Router();
const messagesRouter = require('./messages.api');
const usersRouter = require('./users.api');
const roomsRouter = require('./rooms.api');
const authRouter = require('./auth.api');
const subjectRouter = require('./subjects.api');
const profileRouter = require('./profile.api');
const accessMiddleware = require('../middleware/access.middleware');

router.use('/api/messages', messagesRouter);
router.use('/api/users', usersRouter);
router.use('/api/rooms', roomsRouter);
router.use('/api/auth', authRouter);
router.use('/api/themes', subjectRouter);
router.use('/api/profile', profileRouter);

module.exports = router;
