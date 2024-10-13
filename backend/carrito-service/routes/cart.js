const express = require('express');
const router = express.Router();
const {
  createCart,
  getCartByUserId,
  addItemToCart,
  removeItemFromCart
} = require('../controllers/cartController');

// Crear un carrito
router.post('/', createCart);

// Obtener el carrito de un usuario por su ID
router.get('/:userId', getCartByUserId);

// Agregar un producto al carrito
router.post('/add', addItemToCart);

// Remover un producto del carrito
router.delete('/remove/:userId/:productId', removeItemFromCart);

module.exports = router;
