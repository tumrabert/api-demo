const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const sql = require("../config/sw_dev");

function isValidISO8601(dateString) {
  // Attempt to parse as a Date object
  const dateObj = new Date(dateString);

  // Check if parsing was successful and the date string was in a valid format
  return !isNaN(dateObj.getTime()) && dateObj.toISOString() === dateString; 
}
const validateDates = (dates) => {
  const errorMessages = []; // Array to collect error messages

  if (!Array.isArray(dates)) {
    errorMessages.push("Input must be an array.");
  } else if (dates.length < 1) {
    errorMessages.push("Array must contain at least one date.");
  } else if (dates.length > 3) {
    errorMessages.push("Array cannot contain more than three dates.");
  }

  const uniqueDates = [...new Set(dates)];
  if (uniqueDates.length !== dates.length) {
    errorMessages.push("Array contains duplicate dates.");
  }

  for (let date of dates) {
    if (!isValidISO8601(date)) { 
      errorMessages.push("One or more elements are not valid ISO 8601 date strings.");
    }
  }

  // Return status and error messages
  return {
    isValid: errorMessages.length === 0,
    errorMessages: errorMessages
  };
};


const allowAction = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);
console.log(booking);
const queryUID=booking.userID.toString();
console.log(queryUID)
  return booking && queryUID == userId;
};
// Function to get user id from token
const getUserId = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.id;
};

async function isCampgroundExist(campgroundID) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM campgrounds WHERE id = ${campgroundID}`, (err, data) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        resolve(data.length > 0);
      }
    });
  });
}

// Get a single booking by bookingID D
exports.getBooking = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const bookingId= req.params.id;
    console.log(userId, bookingId)

    if (!userId || !bookingId) {
      return res.status(400).json({ success: false, message: "User ID or Booking ID is missing" });
    }

    if (!await allowAction(bookingId, userId)) {
      return res.status(403).json({ success: false, message: "You are not allowed to do this action" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "Cannot find booking" });
  }
};

// Create a booking D
exports.createBooking = async (req, res, next) => {
  try {
    const checkDates = validateDates(req.body.apptDate);
    if (!checkDates.isValid) {
      return res.status(400).json({ success: false, message: (checkDates.errorMessages).join("\n") });
    }
    const campgroundID = req.body.campgroundID;
    if (!await isCampgroundExist(campgroundID)) {

      return res.status(404).json({ success: false, message: "Campground not found" });
    }
    const userId = getUserId(req);
    const requestBody = req.body;
    requestBody.userID = userId;
    const booking = await Booking.create(requestBody);
    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "Cannot create booking" });
  }
};

//For user

// Get all bookings for each user(The user can see only his bookings) D
exports.getBookings = async (req, res, next) => {
  try {
    // Extract user id from the tokenuserId
    
    const userId = getUserId(req);


    // Find bookings by user id
    const bookings = await Booking.find({ userID: userId });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "Cannot find bookings" });
  }
};

// Update a booking
exports.updateBooking = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const bookingId= req.params.id;
    console.log(userId,bookingId);
    if (!await allowAction(bookingId, userId)) {
      return res.status(403).json({ success: false, message: "You are not allowed to do this action" });
    }

    if (!validateDates(req.body.apptDate)) {
      return res.status(400).json({ success: false, message: "Invalid dates" });
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, req.body, {
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
    console.log(error.message)
    res.status(500).json({ success: false, message: "Cannot update booking" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
  try {
    //TODO: User is  the owner of the booking?

    const userId = getUserId(req);
    const bookingId= req.params.id;
    if (!await allowAction(bookingId, userId)) {
      return res.status(403).json({ success: false, message: "You are not allowed to do this action" });
    }
    
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot delete booking" });
  }
};





//For Admin
// Get all bookings from every user
exports.AdminGetBookings = async (req, res, next) => {
  //console.log(req);
  try {

    const bookings = await Booking.find();
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "Cannot find bookings" });
  }
};

// Admin Update a booking
exports.AdminUpdateBooking = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const bookingId= req.params.id;
    if (!validateDates(req.body.apptDate)) {
      return res.status(400).json({ success: false, message: "Invalid dates" });
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, req.body, {
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
exports.AdminDeleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cannot delete booking" });
  }
};