const express = require('express');
const { Authenticate } = require('../middleware/authmiddleware');
const userController = require('../controllers/userController');
const { protectedRouteUser } = require('../middleware/protectedroute');


class userRoute {
    router;
    constructor() {
        this.router = express.Router();
        this.router.get('/', userController.login);
        this.router.get('/user/dashboard', protectedRouteUser, userController.user);
    }
}

module.exports = new userRoute().router;