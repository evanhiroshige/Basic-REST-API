const mongoose = require('mongoose');

const ObjectSchema = mongoose.Schema({},
    {
        strict: false,
        versionKey: false
    }
);
module.exports = mongoose.model('Obj', ObjectSchema);