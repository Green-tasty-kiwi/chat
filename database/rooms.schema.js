const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const roomsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'themes',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('rooms', roomsSchema);
