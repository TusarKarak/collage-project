const express = require('express');
const potrouter = express.Router();
const pot=require('../models/pot')

potrouter.get("/pot",async (req,res,next)=>{
    const potData=await pot.find();
    console.log(potData,"abc");
    res.json(potData);
})

module.exports = potrouter;