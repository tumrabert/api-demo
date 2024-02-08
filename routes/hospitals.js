const express = require('express');
const { createHospital } = require('../controllers/hospitals');
const router = express.Router();

// POST /api/v1/hospitals
router.post('/', createHospital);

module.exports = router;
