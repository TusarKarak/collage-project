const express=require('express');
const bagRoute=express.Router();
const jwt=require('jsonwebtoken')
const baglist=require("../models/bagList");
const nursery=require("../models/nursery")
const Wishlist=require("../models/WishList")

bagRoute.post("/add/bag",async(req,res)=>{
const {id}=jwt.verify(req.body.token,"tusarkarak")
  const newBag=await baglist.findOne({userId:id});
  let bagItems=1;
  if(!newBag){
  const item=new baglist();
  item.userId=id;
  item.favorites=[req.body.id];
  await item.save();
  }
  else{
      newBag.favorites.push(req.body.id);
    await newBag.save();
    console.log("abc") 
    console.log(newBag);
    bagItems=newBag.favorites.length
  }
  res.json(bagItems); 
})
bagRoute.get("/baglist/:id",async(req,res)=>{
  const {id}=jwt.verify(req.params.id,"tusarkarak");
  
  const newBag=await baglist.findOne({userId:id});
  if(newBag){
      const allBagData=[];
      const allBag=await nursery.find();
      allBag.forEach(data=>{
        newBag.favorites.forEach(item=>{
            data.plants.forEach(plant=>{
              if(plant.id==item)
              allBagData.push(plant);
            })
        })
        newBag.favorites.forEach(item=>{
            data.pots.forEach(pot=>{
              if(pot.id==item)
              allBagData.push(pot);
            })
        })
      })
    
    res.json({allBagData});
  }
  else{
    res.json([]);  
  }
})
bagRoute.post("/baglist/delete",async(req,res)=>{
  const {id}=jwt.verify(req.body.token,"tusarkarak")
  let count=1;
  const newbag=await baglist.findOne({userId:id});
  newbag.favorites=newbag.favorites.filter(id=>{
    if(id==req.body.id){
      count-=1;
    }
    return (count<0 || id!=req.body.id)
  })
  console.log(newbag.favorites)
  await newbag.save();
  let bagItems=newbag.favorites.length
  res.json(bagItems);
})
  
bagRoute.get("/count/bagAndWish/:id",async(req,res)=>{
  const {id}=jwt.verify(req.params.id,"tusarkarak");
   const newBag=await baglist.findOne({userId:id});
   const newWish=await Wishlist.findOne({userId:id});
   console.log(newBag.favorites.length)
   res.json({wishItems:newWish?newWish.favorites.length:0,bagItems:newBag?newBag.favorites.length:0})
})

module.exports=bagRoute; 