const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userIP: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    contacts: {type: [ContactSchema], default: null },
    images: { type: [ImgSchema], default: null }
  },
  {
    timestamps: true
})

// const User = mongoose.model("User", UserSchema);

module.exports = mongoose.model('User', UserSchema);
