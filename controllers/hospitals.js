require('../models/Hospital.js');
exports.createHospital= async (req,res,next)=>{
    const hospital = await Hospital.create(req.body);
    console.log(req.body);
    res.status(201).json({success:true,msg:'Create new hospital',data:hospital});
};