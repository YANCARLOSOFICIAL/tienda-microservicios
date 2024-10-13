const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

// Registro de usuario
router.post('/register', registerUser);

// Inicio de sesión de usuario
router.post('/login', loginUser);

// Obtener usuario por ID
router.get('/:userId', getUserById);

// Actualizar usuario
router.put('/:userId', updateUser);

// Eliminar usuario
router.delete('/:userId', deleteUser);

module.exports = router;
