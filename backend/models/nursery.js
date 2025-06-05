const mongoose = require('mongoose');

const nurserySchema = new mongoose.Schema({
    nursery:String,
    url:String,
    plants:Array,
    pots:Array
});

module.exports = mongoose.model('nurseries', nurserySchema);
