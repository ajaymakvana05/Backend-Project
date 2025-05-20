const express = require('express');
const { Authenticate } = require('../middleware/authmiddleware');
const adminController = require('../controllers/adminController');

class adminRoute {
    router;
    constructor() {
        this.router = express.Router();
        this.router.get('/admin/dashboard',adminController.admin)
        this.router.post('/login', adminController.loginAuth)
    }
}

module.exports = new adminRoute().router;