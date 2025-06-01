const express = require('express');
const nurseryrouter = express.Router();
const Nursery=require('../models/nursery')

nurseryrouter.get("/nursery",async (req,res,next)=>{
    const nurseryData=await Nursery.find();
    console.log("abc");
    res.json(nurseryData);
})

module.exports = nurseryrouter;