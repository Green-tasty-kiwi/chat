const express = require('express');

const router = express.Router();
const SubjectsSchema = require('../database/subjects.schema');
const RoomsSchema = require('../database/rooms.schema');

module.exports = router
    .get('/', async (request, response, next) => {
        try {
            const subjects = await SubjectsSchema.find();
            response.send(subjects);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/', async (request, response, next) => {
        try {
            const subjects = await SubjectsSchema.find();
            response.send(subjects);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/:id', async (request, response, next) => {
        const subjectId = request.params.id;
        try {
            const subject = await SubjectsSchema.findById(subjectId);
            response.send(subject);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/:subjectId/rooms', async (request, response, next) => {
        const subjectId = request.params.subjectId;
        try {
            const rooms = await RoomsSchema.find({
                subject: subjectId,
            }).populate('name');

            response.send(rooms);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .post('/:subjectId/rooms', async (request, response, next) => {
        const subjectId = request.params.subjectId;
        try {
            const subject = await SubjectsSchema.findById(subjectId);

            const rooms = await RoomsSchema.create({
                subject,
                description: request.body.description,
                name: request.body.name,
            });

            response.send(rooms);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .post('/', async (request, response, next) => {
        const body = request.body;
        try {
            const subject = await SubjectsSchema.create({
                name: body.name,
            });
            response.send(subject);
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    });
