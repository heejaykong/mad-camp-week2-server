const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageName: {type: String},
    image: {type: String}
  },
  {
    timestamps: true
})

module.exports = mongoose.model('Image', ImageSchema);
