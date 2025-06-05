const mongoose = require('mongoose');

const nurserySchema = new mongoose.Schema({
    nursery:String,
    url:String,
    plants:Array,
    pots:Array
});

<<<<<<< HEAD
module.exports = mongoose.model('nurseries', nurserySchema);
=======
module.exports = mongoose.model('abcdnurseries', nurserySchema);
>>>>>>> a9e76b14fb723ee31a9364a796c16a8b2a108be3
