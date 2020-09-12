const express = require('express');

const router = express.Router();
const UsersSchema = require('../database/users.schema');

module.exports = router
    .get('/users', async (request, response, next) => {
        try {
            const users = await UsersSchema.find();
            response.send(users);
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    })
    .get('/users/:id', async (request, response, next) => {
        const userId = request.params.id;
        try {
            const user = await UsersSchema.findById(userId);
            response.send(user);
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    })
    .post('/users', async (request, response) => {
        const body = request.body;

        try {
            const user = await UsersSchema.create({
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.password,
                email: body.email,
            });

            response.send(user);
        } catch (error) {
            console.error(error);
            response.send('Error');
        }
    });
