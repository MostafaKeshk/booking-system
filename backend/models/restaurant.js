const mongoose = require('mongoose');
const {phoneRegex} = require('../utils/regex');
const restaurantSchema = new mongoose.Schema({
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
    match: phoneRegex,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: String,
  userType: {
    type: String,
    enum: ['restaurant'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  bookingList: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
