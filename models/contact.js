const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    phoneNum: { type: String, required: true, unique: true }
    // profileImage: {
    //     data: Buffer,
    //     contentType: String,
    //     default: false
    // }
});

// const Contact = mongoose.model("Contact", ContactSchema);

module.exports = mongoose.model('Contact', ContactSchema);
