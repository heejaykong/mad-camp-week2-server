const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    phoneNum: { type: String, required: true, unique: true },
    url: { type: String }
});

module.exports = mongoose.model('Contact', ContactSchema);
