const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const User = require('../models/user')

class UserController {
    login = (req, res) => {
        return res.render('login/login');
    }

    user = (req, res) => {
        res.render('userdashboard/userdashboard');
    }
}

module.exports = new UserController();