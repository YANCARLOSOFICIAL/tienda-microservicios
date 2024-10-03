const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Obtener carrito por userId
router.get('/:userId', cartController.getCart);

// Crear un nuevo carrito
router.post('/', cartController.createCart);

// Agregar un producto al carrito
router.post('/add', cartController.addProductToCart);

// Eliminar un producto del carrito
router.post('/remove', cartController.removeProductFromCart);

module.exports = router;
