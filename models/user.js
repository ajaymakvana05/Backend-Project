const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
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
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    }
});

const user = new mongoose.model('user', userschema);
module.exports = user;