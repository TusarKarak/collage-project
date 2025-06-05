const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    userId:String,
    favorites:Array,
});

module.exports = mongoose.model('wiselist', WishSchema);
