const express = require('express');
const path = require('path');
const accessMiddleware = require('../middleware/access.middleware');
const router = express.Router();
const MessagesSchema = require('../database/messages.schema');
const RoomsSchema = require('../database/rooms.schema');
const SubjectsSchema = require('../database/subjects.schema');

router
    .get('/rooms/create', accessMiddleware, async (request, response) => {
        const user = request.session.passport.user;

        try {
            const subjects = await SubjectsSchema.find().lean();
            response.render('createRoom', { layout: 'layout', subjects, user });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/rooms/:id', accessMiddleware, async (request, response) => {
        const roomId = request.params.id;
        const user = request.session.passport.user;

        try {
            const messages = await MessagesSchema.find({
                room: roomId,
            })
                .populate('sender', [
                    'firstName',
                    'lastName',
                    'createdAt',
                    'updatedAt',
                    '_id',
                ])
                .lean();
            console.log(messages);
            response.render('room', {
                layout: 'layout',
                messages,
                room: roomId,
                user,
            });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/themes/:id', accessMiddleware, async (request, response) => {
        const themeId = request.params.id;
        const user = request.session.passport.user;

        try {
            const rooms = await RoomsSchema.find({
                subject: themeId,
            })
                .populate('subject', ['name'])
                .lean();
            console.log(rooms);
            response.render('rooms', {
                layout: 'layout',
                rooms,
                subject: themeId,
                user,
            });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/themes', accessMiddleware, async (request, response) => {
        const user = request.session.passport.user;

        try {
            const subjects = await SubjectsSchema.find().lean();
            response.render('themes', { subjects, user });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/rooms', accessMiddleware, async (request, response) => {
        const user = request.session.passport.user;
        const searchName = request.query.search;
        if (searchName) {
            const rooms = await RoomsSchema.find({
                name: { $regex: new RegExp(searchName) },
            }).lean();
            response.render('rooms', { rooms, user });
            return;
        }
        try {
            const rooms = await RoomsSchema.find().lean();
            response.render('rooms', { rooms, user });
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
    })
    .get('/profile', accessMiddleware, (request, response) => {
        const user = request.session.passport.user;

        response.render('profile', { user });
    });

module.exports = router;
