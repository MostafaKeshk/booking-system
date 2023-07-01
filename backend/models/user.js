const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\+\d{1,3}\d{6,14}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: String,
  userType: {
    type: String,
    enum: ['user'],
    required: true,
  }
});

module.exports = mongoose.model('User', userSchema);
