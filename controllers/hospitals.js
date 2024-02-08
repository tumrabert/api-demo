const Hospital = require('../models/Hospital.js');
exports.createHospital= async (req,res,next)=>{
    const hospital = await Hospital.create(req.body);
    console.log(req.body);
    //res.status(200).json({success:true,msg:'Create new hospital'});
    res.status(201).json({success:true,msg:'Create new hospital',data:hospital});
};
exports.getHospital= async (req,res,next)=>{
    try{
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital){
            return res.status(400).json({success:false});
        }
        return res.status(200).json({success:true,data:hospital});
    }catch(err){
        res.status(400).json({success:false});
    }
};
exports.getHospitals= async (req,res,next)=>{
    try{
        const hospitals = await Hospital.find();
        res.status(200).json({success:true,count:hospitals.length,data:hospitals});
    }catch(err){
        res.status(400).json({success:false});
    }
};
exports.updateHospital= async (req,res,next)=>{
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runVaditors:true
        });
        if(!hospital){
            return res.status(400).json({success:false});
        }
        return res.status(200).json({success:true,data:hospital});
    }catch(err){
        res.status(400).json({success:false});
    }
};
exports.deleteHospital= async (req,res,next)=>{
    try{
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if(!hospital){
            return res.status(400).json({success:false});
        }
        return res.status(200).json({success:true,data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};
