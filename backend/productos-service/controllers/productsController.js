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

// Obtener un producto por ID
// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  const { id } = req.params; // Aquí cambia de productId a id

  try {
    const product = await Product.findById(id); // Buscar por ID
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

