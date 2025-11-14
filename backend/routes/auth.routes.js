const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validateRegister, validateLogin } = require('../validators/auth.validator');

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected route (needs login)
router.get('/me', authenticate, getMe);

module.exports = router;
