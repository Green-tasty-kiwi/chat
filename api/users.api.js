const express = require('express');
const router = express.Router();
const UsersSchema = require('../database/users.schema');
const path = require('path');

const findOneUserController = require('../controllers/index')
    .findOneUserController;
const findAllUsersController = require('../controllers/index')
    .findAllUsersController;
const createUserController = require('../controllers/index')
    .createUserController;

module.exports = router
    .get('/', findAllUsersController)
    .get('/:id', findOneUserController)
    .post('/', createUserController)
    .get('/:id/avatar', async function (request, response, next) {
        const userId = request.params.id;
        try {
            const user = await UsersSchema.findById(userId);
            if (user.avatar) {
                response.sendFile(
                    path.join(__dirname, `../uploads/${user.id}/${user.avatar}`)
                );
            } else {
                response.sendFile(
                    path.join(
                        __dirname,
                        '../views/assets/images/default-avatar.png'
                    )
                );
            }
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    });
