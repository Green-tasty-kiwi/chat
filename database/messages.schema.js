const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const messagesSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    sender: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
        required: true,
    },
});

module.exports = model('messages', messagesSchema);
