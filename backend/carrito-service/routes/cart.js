const express = require('express');
const router = express.Router();
const {
  addOrUpdateCart,
  getCart,
  removeItemFromCart,
  clearCart,
  getAllCarts
} = require('../controllers/cartController');

// Agregar o actualizar el carrito
router.post('/', addOrUpdateCart);

// Obtener el carrito
router.get('/', getCart);

// Obtener todos los carritos
router.get('/all', getAllCarts);

// Eliminar un producto del carrito
router.delete('/remove/:productId', removeItemFromCart);

// Vaciar el carrito
router.delete('/clear', clearCart);

module.exports = router;
