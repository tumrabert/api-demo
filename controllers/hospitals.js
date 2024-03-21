const Hospital = require("../models/Hospital.js");
const vacCenter = require("../models/VacCenter");

//@desc Get vaccine centers

//@route GET /api/v1/hospitals/vacCenters/

//@access Public
exports.getVacCenters = (req, res, next) => {
  vacCenter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Vaccine Centers.",
      });
    else res.send(data);
  });
};

exports.createHospital = async (req, res, next) => {
  const hospital = await Hospital.create(req.body);
  console.log(req.body);
  //res.status(200).json({success:true,msg:'Create new hospital'});
  res
    .status(201)
    .json({ success: true, msg: "Create new hospital", data: hospital });
};
exports.getHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: hospital });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
exports.getHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();
    res
      .status(200)
      .json({ success: true, count: hospitals.length, data: hospitals });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
exports.updateHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runVaditors: true,
    });
    if (!hospital) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: hospital });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
exports.deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
