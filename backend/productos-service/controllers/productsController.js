const Product = require('../models/Product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  const newProduct = new Product({ name, description, price, stock, imageUrl });
  
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};
