const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    person: {
    personId: String,
    lastLogin: Date,
    online: true
    },
    name: {
        firstName: String,
        lastName: String,
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