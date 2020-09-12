const express = require('express');
const path = require('path');
const accessMiddleware = require('../middleware/access.middleware');
const router = express.Router();
const MessagesSchema = require('../database/messages.schema');

router
    .get('/rooms/:id', accessMiddleware, async (request, response) => {
        const roomId = request.params.id;
        try {
            const messages = await MessagesSchema.find({
                room: roomId,
            })
                .populate('sender', ['firstName', 'lastName'])
                .lean();

            response.render('room', { layout: false, messages });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/rooms', accessMiddleware, (request, response) => {
        try {
            response.render('rooms');
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/signup', (request, response) => {
        response.sendFile(path.join(__dirname, 'signup.html'));
    })
    .get('/signin', (request, response) => {
        response.sendFile(path.join(__dirname, 'signin.html'));
    });

module.exports = router;
