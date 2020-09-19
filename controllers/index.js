const usersController = require('./users/findOneUser.controller');
const findOneMessageController = require('./messages/findOneMessage.controller');
const findAllMessageController = require('./messages/findAllMessages.controller');
const postMessageController = require('./messages/postMessage.controller');
const findOneUserController = require('./users/findOneUser.controller');
const findAllUsersController = require('./users/findAllUsers.controller');
const createUserController = require('./users/createUser.controller');

module.exports = {
    findOneMessageController,
    findAllMessageController,
    postMessageController,
    findOneUserController,
    findAllUsersController,
    createUserController,
};
