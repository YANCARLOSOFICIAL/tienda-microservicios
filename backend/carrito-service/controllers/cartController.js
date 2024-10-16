const axios = require('axios');
const Cart = require('../models/Cart');

// Crear un carrito para un usuario
exports.createCart = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  try {
    // Verificar si el usuario existe en el servicio de usuarios
    const userResponse = await axios.get(`http://localhost:3002/users/${userId}`);
    if (!userResponse.data) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener el nombre del usuario
    const userName = userResponse.data.name;

    const cart = new Cart({ userId, items });
    await cart.save();

    res.status(201).json({ cart, userName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

// Obtener el carrito de un usuario por su ID
exports.getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Falta el ID del usuario' });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Agregar un producto al carrito
exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  try {
    // Verificar si el producto existe en el servicio de productos
    const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
    if (!productResponse.data) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Obtener el ID del producto
    const productData = productResponse.data;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Buscar si el producto ya existe en el carrito
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity; // Incrementar cantidad si el producto ya está en el carrito
    } else {
      cart.items.push({ productId: productData._id, quantity }); // Usar el ID del producto devuelto por el microservicio
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// Remover un producto del carrito
exports.removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Filtrar el producto que se desea eliminar
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};

// Obtener todos los carritos
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find(); // Obtiene todos los documentos de la colección
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los carritos', error });
  }
};