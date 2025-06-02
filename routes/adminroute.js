const express = require('express');
const { AuthenticateAdmin } = require('../middleware/authmiddleware');
const adminController = require('../controllers/adminController');

class adminRoute {
    router;
    constructor() {
        this.router = express.Router();
        this.router.post('/login', adminController.loginAuth);
        this.router.get('/admin/dashboard', AuthenticateAdmin, adminController.admin);
        this.router.post('/admin/createUser', AuthenticateAdmin, adminController.createUser);
        this.router.get('/admin/allUser', AuthenticateAdmin, adminController.allUserFind);
    }
}

module.exports = new adminRoute().router;