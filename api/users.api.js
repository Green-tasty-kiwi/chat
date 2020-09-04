const express = require('express');

const router = express.Router();

module.exports = router
    .get('/users', (request, response, next) => {
        response.send([]);
    })
    .get('/users/:id', (request, response, next) => {
        const userId = request.params.id;

        // find user

        response.send(null);
    })
    .get('/users/:id/masseges', (request, response, next) =>{
        const userId = request.params.id;
        response.send(null);
    })
    .post('/users', () => {
        // CREATE USER

        response.send(null);
    })
