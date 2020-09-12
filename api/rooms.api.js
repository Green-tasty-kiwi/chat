const express = require('express');

const router = express.Router();
const RoomsSchema = require('../database/rooms.schema');
const MessagesSchema = require('../database/messages.schema');

module.exports = router
    .get('/', async (request, response, next) => {
        try {
            const rooms = await RoomsSchema.find();
            response.send(rooms);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/:id', async (request, response, next) => {
        const roomId = request.params.id;
        try {
            const room = await RoomsSchema.findById(roomId);
            response.send(room);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/:roomId/messages', async (request, response, next) => {
        const roomId = request.params.roomId;
        try {
            const messages = await MessagesSchema.find({
                room: roomId,
            }).populate('room', 'name');

            response.send(messages);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .post('/:roomId/messages', async (request, response, next) => {
        const roomId = request.params.roomId;
        try {
            const room = await RoomsSchema.findById(roomId);

            const messages = await MessagesSchema.create({
                room,
                text: request.body.text,
                sender: request.session.user,
            });

            response.send(messages);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .post('/', async (request, response, next) => {
        const body = request.body;
        try {
            const room = await RoomsSchema.create({
                name: body.name,
            });
            response.send(room);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    });
