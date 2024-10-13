const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

// Crear un nuevo pedido
router.post('/', createOrder);

// Obtener un pedido por ID
router.get('/:orderId', getOrderById);

// Actualizar el estado del pedido
router.put('/:orderId', updateOrderStatus);

// Eliminar un pedido
router.delete('/:orderId', deleteOrder);

module.exports = router;
