const express = require('express');

const router = express.Router();
const MessagesSchema = require('../database/messages.schema');

module.exports = router
    .get('/', async (request, response, next) => {
        try {
            const messages = await MessagesSchema.find()
                .populate('receiver', ['firstName', 'lastName'])
                .populate('sender', ['firstName', 'lastName']);
            response.send(messages);
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    })
    .get('/:id', async (request, response, next) => {
        let messageId = request.params.id;
        try {
            const message = await MessagesSchema.findById(messageId);
            response.send(message);
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    })
    .post('/', async (request, response, next) => {
        const senderId = request.session.passport.user;
        const text = request.body.text;

        try {
            if (!senderId) {
                response.send('SENDER');
            }
            let message = await MessagesSchema.create({
                text: text,
                sender: senderId,
            });

            message = await MessagesSchema.findById(
                message._id
            ).populate('sender', ['firstName', 'lastName']);

            response.send(message);
        } catch (error) {
            console.error(error);
            response.send(error);
        }
    });
