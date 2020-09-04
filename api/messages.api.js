const express = require('express');

const router = express.Router();

module.exports = router
    .get('/messages', (req,res,next) => {
        res.send([]);
})
    .get('/messages/:id', (req,res,next) => {
        let messageId = req.params.id;
        res.send(null);
    })
    .post('/messages', (req,res,next) => {
        res.send(null);
    })