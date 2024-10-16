const express = require('express');
const router = express.Router();
const {
  createCart,
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  getAllCarts, 
} = require('../controllers/cartController');

//todos
router.get('/all',getAllCarts);
// Crear un carrito
router.post('/', createCart);

// Obtener el carrito de un usuario por su ID
router.get('/:userId', getCartByUserId);

// Agregar un producto al carrito
router.post('/add', addItemToCart);

// Remover un producto del carrito
router.delete('/remove/:userId/:productId', removeItemFromCart);

//todos
router.get('/all',getAllCarts);

module.exports = router;
