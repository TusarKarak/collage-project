const express = require('express');
const nurseryrouter = express.Router();
const nursery=require('../models/nursery')

nurseryrouter.get("/nursery/:name",async (req,res,next)=>{
    const nurseryData=await nursery.findOne({nursery:req.params.name});
    console.log(nurseryData,req.params.name);
    res.json(nurseryData);
})
nurseryrouter.get("/allnursery/:plant",async (req,res,next)=>{
    const nurseryData=await nursery.find();
    let allplants=[];
    for(let i=0;i<nurseryData.length;i++){
        allplants=[...allplants,...nurseryData[i].plants,...nurseryData[i].pots];
    }
    allplants=allplants.filter(item=>item.item_name.toLowerCase().includes(req.params.plant.trim().toLowerCase().split(" ")[0]))
    console.log(allplants,req.params.plant);
    res.json({plants:allplants});
})
nurseryrouter.get("/allplants/:type",async (req,res,next)=>{
    const nurseryData=await nursery.find();
    let allplants=[];
    for(let i=0;i<nurseryData.length;i++){
        allplants=[...allplants,...nurseryData[i].plants];
    }
    allplants=allplants.filter(item=>item.item_type===req.params.type);
    console.log(allplants,req.params.plant);
    res.json(allplants);
})

nurseryrouter.get("/allnurserys",async (req,res,next)=>{
    const nurseryData=await nursery.find();
    const data=[];
    nurseryData.forEach(item=>{
        data.push({nursery:item.nursery,url:item.url})
    })
    console.log(data)
    res.json(data);
})
nurseryrouter.get("/plant/indoor",async (req,res)=>{
    const nurseryData=await nursery.find();
    const plant=[];
    nurseryData.forEach(async (data)=>{
        data.plants.forEach(item=>{
            if(item.type=='indoor plant'){
                plant.push(item);
            }
        })
    })
    res.json(plant);
})
nurseryrouter.get("/plant/outdoor",async (req,res)=>{
    const nurseryData=await nursery.find();
    const plant=[];
    nurseryData.forEach(async (data)=>{
        data.plants.forEach(item=>{
            if(item.type=='outdoor plant'){
                plant.push(item);
            }
        })
    })
    res.json(plant);
})
nurseryrouter.get("/pot/bigpot",async (req,res)=>{
    const nurseryData=await nursery.find();
    const pot=[];
    nurseryData.forEach(async (data)=>{
        data.pots.forEach(item=>{
            if(item.type=='big pot'){
                pot.push(item);
            }
        })
    })
    res.json(pot);
})
nurseryrouter.get("/pot/smallpot",async (req,res)=>{
    const nurseryData=await nursery.find();
    const pot=[];
    nurseryData.forEach(async (data)=>{
        data.pots.forEach(item=>{
            if(item.type=='small pot'){
                pot.push(item);
            }
        })
    })
    console.log(pot)
    res.json(pot);
})

module.exports = nurseryrouter;