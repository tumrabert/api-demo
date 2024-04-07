const Booking = require("../models/Booking");
// Helper function to validate dates
const validateDates = (dates) => {
  if (!Array.isArray(dates) || dates.length < 1 || dates.length > 3) {
    return false;
  }

  const uniqueDates = [...new Set(dates)];
  if (uniqueDates.length !== dates.length) {
    return false;
  }

  for (let date of dates) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
      return false;
    }
  }

  return true;
};

// Get all bookings
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot find bookings" });
  }
};

// Get a single booking
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot find booking" });
  }
};

// Create a booking
exports.createBooking = async (req, res, next) => {
  try {
    if (!validateDates(req.body.apptDate)) {
      return res.status(400).json({ success: false, message: "Invalid dates" });
    }

    const booking = await Booking.create(req.body);
    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot create booking" });
  }
};

// Update a booking
exports.updateBooking = async (req, res, next) => {
  try {
    if (!validateDates(req.body.apptDate)) {
      return res.status(400).json({ success: false, message: "Invalid dates" });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot update booking" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot delete booking" });
  }
};