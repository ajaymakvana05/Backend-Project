const mongoose = require('mongoose');


const adminschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String
    },
    role: {
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const admin = new mongoose.model('admin', adminschema)
module.exports = admin;