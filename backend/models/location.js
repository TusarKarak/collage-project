const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId:String,
    name:String,
    ph_no:Number,
    address:String,
    city_district_town:{type:String,unique:true},
    state:String,
    pin:Number,
    locality:String,
    landmark:String,
    alt_phno:Number,
});

module.exports = mongoose.model('location', locationSchema);