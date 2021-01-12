const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    isLiked: { type: Boolean, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
