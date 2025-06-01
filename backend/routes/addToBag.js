const express=require('express');
const bagRoute=express.Router();
const jwt=require('jsonwebtoken')
const wiselist=require("../models/wiseList")

bagRoute.post("/add/wise",async(req,res)=>{
  const {id}=jwt.verify(req.body.token,"tusarkarak")
  const newWish=await wiselist.findOne({userId:id});
  if(!newWish){
  const item=new wiselist();
  item.userId=id;
  item.favorites=[req.body.id];
  item.save();
  }
  else{
    if(newWish.favorites.includes(req.body.id)){
      newWish.favorites=newWish.favorites.filter(item=>item!=req.body.id);
    }
      else{
      newWish.favorites.push(req.body.id);
    }
    newWish.save();
  }
  res.json(); 
})
bagRoute.get("/add/wise/:id",async(req,res)=>{
  //console.log(req.params,"anb");
  const {id}=jwt.verify(req.params.id,"tusarkarak");

  const newWish=await wiselist.findOne({userId:id});
  if(newWish){
  res.json(newWish.favorites);
  }
  else{
    res.json([]); 
  }
})

module.exports=bagRoute;