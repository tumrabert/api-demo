const express = require('express');
const { createHospital,getHospital,getHospitals,updateHospital,deleteHospital} = require('../controllers/hospitals');
const router = express.Router();

// POST /api/v1/hospitals
/* router.get('/:id', getHospital);
router.get('/', getHospitals);
router.post('/', createHospital);

router.delete('/:id', updateHospital);
router.put('/:id', deleteHospital); */

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).delete(deleteHospital).put(updateHospital)

module.exports = router;
