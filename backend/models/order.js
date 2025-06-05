const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:String,
    name:String,
    ph_no:Number,
    address:String,
    city_district_town:String,
    state:String,
    pin:Number,
    locality:String,
    landmark:String,
    alt_phno:Number,
    payment:Boolean,
    cashOnDelivery:Boolean,
    price:Number,
    deliveryDate:Date,
    items:Array
});

module.exports = mongoose.model('orders', orderSchema);