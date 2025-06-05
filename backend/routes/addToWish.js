const express=require('express');
const wishRoute=express.Router();
const jwt=require('jsonwebtoken')
const Wishlist=require("../models/WishList")
const nursery=require("../models/nursery")
const baglist=require("../models/bagList");

wishRoute.post("/add/wish",async(req,res)=>{
  const {id}=jwt.verify(req.body.token,"tusarkarak")
  const newWish=await Wishlist.findOne({userId:id});
  let wishItems=1;
  if(!newWish){
  const item=new Wishlist();
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
    await newWish.save();

    console.log(newWish)
  }
  wishItems=newWish.favorites.length;
  res.json(wishItems); 
})
wishRoute.get("/add/wish/:id",async(req,res)=>{
  //console.log(req.params,"anb");
  const {id}=jwt.verify(req.params.id,"tusarkarak");

  const newWish=await Wishlist.findOne({userId:id});
  if(newWish){
  res.json({newWish:newWish.favorites});
  }
  else{
    res.json([]); 
  }
})
wishRoute.get("/wishlist/:id",async(req,res)=>{
  //console.log(req.params,"anb");
  const {id}=jwt.verify(req.params.id,"tusarkarak");

  const newWish=await Wishlist.findOne({userId:id});
  if(newWish){
    const allWishData=[];
    const allWish=await nursery.find();
    allWish.forEach(data=>{
      data.plants.forEach(item=>{
        if(newWish.favorites.includes(item.id)){ 
            allWishData.push(item);
        }
      })
      data.pots.forEach(item=>{
        if(newWish.favorites.includes(item.id)){
            allWishData.push(item);
        }
      })
    })
    //allWish=allWish.filter((data)=>newWish.favorites.includes(String(data._id)))
    
    console.log(allWishData,"abc")
  res.json({allWishData});
  }
  else{
    res.json([]);   
  }
})
wishRoute.post("/wishlist/delete",async(req,res)=>{
  const {id}=jwt.verify(req.body.token,"tusarkarak")
  let wishItems=1;
  const newbag=await Wishlist.findOne({userId:id});
  newbag.favorites=newbag.favorites.filter(id=>id!=req.body.id)
  console.log(newbag.favorites)
  await newbag.save();
  wishItems=newbag.favorites.length;
  res.json(wishItems);
})


module.exports=wishRoute; 
