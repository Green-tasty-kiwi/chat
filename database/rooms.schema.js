const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const roomsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('rooms', roomsSchema);
