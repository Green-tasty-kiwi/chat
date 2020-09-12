const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30
    }
});

module.exports = model('users', usersSchema);