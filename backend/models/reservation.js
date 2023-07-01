const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled','done'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
