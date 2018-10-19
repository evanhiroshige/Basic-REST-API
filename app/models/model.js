const mongoose = require('mongoose');

// Schema to hold arbitrary fields
const ObjectSchema = mongoose.Schema({},
    {
        strict: false,
        versionKey: false
    }
);
module.exports = mongoose.model('Obj', ObjectSchema);