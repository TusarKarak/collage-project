const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
    image:String,
    nursery:String,
    item_name:String,
    original_price:Number,
    discount_percentage:Number,
    return_period:Number,
    delivery_date:Date,
  
});

module.exports = mongoose.model('pot', potSchema);
