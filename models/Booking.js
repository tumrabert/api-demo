const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  apptDate: {
    type: [Date],
    validate: [arrayLimit, '{PATH} expects at least 1 date.']
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  campgroundID: {
    type: String,
    ref: "Campground",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model("Booking", BookingSchema);
