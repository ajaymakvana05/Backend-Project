const express = require('express');
const { Authenticate } = require('../middleware/authmiddleware');
const adminController = require('../controllers/adminController');
const { protectedRouteAdmin } = require('../middleware/protectedroute');


class adminRoute {
    router;
    constructor() {
        this.router = express.Router();
        this.router.post('/login', adminController.loginAuth);
        this.router.get('/admin/dashboard', protectedRouteAdmin, adminController.admin);
    }
}

module.exports = new adminRoute().router;