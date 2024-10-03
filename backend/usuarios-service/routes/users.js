const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/usersController');

// Registro de usuario
router.post('/register', registerUser);

// Inicio de sesión de usuario
router.post('/login', loginUser);

module.exports = router;
