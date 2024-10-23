const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios'); // Importar Axios para llamadas HTTP
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware de autenticación y autorización
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Llamar al microservicio de usuarios para validar el token
    const response = await axios.get('http://localhost:3002/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    req.user = response.data;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    res.status(401).json({ error: 'Token inválido o usuario no autorizado' });
  }
};

const requireAdminRole = (req, res, next) => {
  if (!req.user.roles.includes('admin')) {
    return res.status(403).json({ error: 'Se requiere rol de administrador' });
  }
  next();
};

// Rutas del CRUD de productos
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticateUser, requireAdminRole, upload.single('image'), createProduct);
router.put('/:id', authenticateUser, requireAdminRole, upload.single('image'), updateProduct);
router.delete('/:id', authenticateUser, requireAdminRole, deleteProduct);

module.exports = router;
