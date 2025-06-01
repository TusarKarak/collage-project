const mongoose = require('mongoose');

const wiseSchema = new mongoose.Schema({
    userId:String,
    favorites:Array,
});

module.exports = mongoose.model('wiselist', wiseSchema);
