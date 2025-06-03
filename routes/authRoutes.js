const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.post('/admin/login', AuthController.adminLogin);
router.post('/admin/register', AuthController.adminRegister);

module.exports = router;
