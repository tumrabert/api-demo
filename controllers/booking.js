const Booking = require("../models/Booking");

// @desc Get all appointments
// @route GET /api/v1/appointments
// @access Public
exports.getAppointments = async (req, res, next) => {
  let query;
  // General users can see only their appointments!
  if (req.user.role !== "admin") {
    query = Appointment.find({ user: req.user.id });
  } else {
    //If you are an admin, you can see all!
    if (req.params.campgroundId) {
      console.log(req.params.campgroundId);
      query = Booking.find({ campground: req.params.campgroundId });
    } else query = Booking.find();
  }

  try {
    const booking = await query;

    res.status(200).json({
      success: true,
      count: booking.length,
      data: booking,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Cannot find Booking" });
  }
};
