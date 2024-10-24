const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Ruta para obtener detalles del usuario autenticado
router.get('/me', authMiddleware, userController.getUserDetails);

// Ruta para registrar usuario
router.post('/register', userController.registerUser);

// Ruta para login de usuario
router.post('/login', userController.loginUser);

// Rutas protegidas para usuarios y administradores
router.get('/dashboard', authMiddleware, userController.getDashboard);

// Ruta exclusiva para administradores
router.get('/admin', authMiddleware, userController.getAdminPanel);

module.exports = router;
