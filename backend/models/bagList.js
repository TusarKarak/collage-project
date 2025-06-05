const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
    userId:String,
    favorites:Array,
});

module.exports = mongoose.model('baglist', bagSchema);
