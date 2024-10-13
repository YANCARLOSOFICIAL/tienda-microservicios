const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct ,getProductById } = require('../controllers/productsController');

// Rutas para obtener todos los productos y crear uno nuevo
router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);


module.exports = router;
