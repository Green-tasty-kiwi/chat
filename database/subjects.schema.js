const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const subjectsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});
subjectsSchema.statics.findByName = function (name) {
    return this.findOne({ name: name });
};
module.exports = model('themes', subjectsSchema);
