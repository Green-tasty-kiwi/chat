const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    messageId: String,
    text: {
        type: String,
        required: true
    },
    user: {
        senderId : String,
        receiverId: String,
        timestamp: Number,
    }
});