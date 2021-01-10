const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    // imageName: { type: String },
    // // imagePath: { type: String }
    // image: {
    //   data: Buffer,
    //   contentType: String
    // }
    imageName: String,
    image: Buffer
  },
  {
    timestamps: true
})

// const Img = mongoose.model("ImgSchema", ImgSchema);

module.exports = mongoose.model('Image', ImageSchema);
