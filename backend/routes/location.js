const express = require("express");
const locationRoute=express.Router();
const jwt=require('jsonwebtoken')
const location=require('../models/location')
const order=require('../models/order')


locationRoute.get("/mylocations/:token", async (req, res) => {
  const {id}=jwt.verify(req.params.token,"tusarkarak")
  const allLocations=await location.find({userId:id})
  res.json(allLocations);
});
locationRoute.post("/mylocations/:token", async (req, res) => {
    const {id}=jwt.verify(req.params.token,"tusarkarak");
    req.body.data.userId=id;
    console.log(req.body.data)
    let data;
    if(data=await location.findOne({city_district_town:req.body.data.city_district_town}))
      return res.json(data)
    if(req.body.data.id){
      newId=req.body.data.id
      const data=req.body.data
      const loc=await location.findById(newId)
      await loc.updateOne(data);      
    }else{
    const newLocation=await new location(req.body.data);
    await newLocation.save();
    }
    res.json({msg:"saved"}); 
})
locationRoute.post("/deliverylocation/:token", async (req, res) => {
    const {id}=jwt.verify(req.params.token,"tusarkarak");
    req.body.data.userId=id;
    if(req.body.data._id){
      req.body.data._id=undefined;
    }
    console.log(req.body.data._id)
    const newOrder=await new order(req.body.data);
    await newOrder.save();
    res.json({orderId:newOrder._id}); 
})
locationRoute.get("/payment/:id", async (req, res) => {
    const newOrder=await order.findById(req.params.id);
    newOrder.payment=true;
    await newOrder.save();
    res.json({orderId:newOrder._id}); 
})
locationRoute.get("/payment/cash/:id", async (req, res) => {
    const newOrder=await order.findById(req.params.id);
    newOrder.cashOnDelivery=true;
    await newOrder.save();
    res.json({orderId:newOrder._id}); 
})
locationRoute.get("/myorders/:id", async (req, res) => {
    const newOrder=await order.findById(req.params.id);
    res.json(newOrder); 
})
locationRoute.get("/myallorders/:token", async (req, res) => {
  const {id}=jwt.verify(req.params.token,"tusarkarak");
    const newOrder=await order.find({userId:id});
    res.json(newOrder); 
})

module.exports=locationRoute;


