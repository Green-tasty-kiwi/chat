const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const subjectsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('themes', subjectsSchema);
