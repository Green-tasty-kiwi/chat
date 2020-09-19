const express = require('express');

const router = express.Router();

const findOneMessageController = require('../controllers/index')
    .findOneMessageController;

const findAllMessageController = require('../controllers/index')
    .findAllMessageController;

const postMessageController = require('../controllers/index')
    .postMessageController;

module.exports = router
    .get('/', findAllMessageController)

    .get('/:id', findOneMessageController)

    .post('/', postMessageController);
