const Cart = require('../models/Cart');
const axios = require('axios'); // Usar axios para hacer solicitudes HTTP

// Obtener el carrito de un usuario por userId
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Encuentra el carrito por userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Hacer una solicitud al servicio de productos para obtener detalles de cada producto
    const productDetails = await Promise.all(
      cart.items.map(async (item) => {
        const response = await axios.get(`http://localhost:3001/api/products/${item.productId}`);
        return {
          product: response.data,
          quantity: item.quantity
        };
      })
    );

    // Devuelve el carrito con los detalles de los productos
    res.status(200).json({
      _id: cart._id,
      userId: cart.userId,
      items: productDetails
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Crear un nuevo carrito
exports.createCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const newCart = new Cart({ userId, items: [] });
    await newCart.save();

    res.status(201).json(newCart);
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      // Si el producto ya existe, actualizar la cantidad
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, agregar un nuevo producto
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

// Eliminar un producto del carrito
exports.removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Filtrar el producto que se quiere eliminar
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};
