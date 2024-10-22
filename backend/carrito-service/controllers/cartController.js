const Cart = require('../models/Cart');
const axios = require('axios');

// Crear o actualizar el carrito (Agregar o modificar productos)
exports.addOrUpdateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  try {
    const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
    const product = productResponse.data;

    if (!product || product.stock < quantity) {
      return res.status(400).json({ error: 'Producto no disponible o stock insuficiente' });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    // Actualizar el stock del producto
    await axios.put(`http://localhost:3001/api/products/${productId}`, {
      stock: product.stock - quantity,
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al agregar o actualizar el carrito:', error.message);
    if (error.response) {
      // Si el error es debido a la API de productos
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: 'Error al agregar o actualizar el carrito' });
  }
};
// Obtener el carrito
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Eliminar un producto del carrito
exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
    const product = productResponse.data;

    await axios.put(`http://localhost:3001/api/products/${productId}`, {
      stock: product.stock + item.quantity,
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error.message);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};

// Vaciar el carrito
exports.clearCart = async (req, res) => {
  try {
    console.log('Vaciando el carrito...');
    await Cart.deleteOne();
    res.status(200).json({ message: 'Carrito vaciado con éxito' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error.message);
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};

// Obtener todos los carritos
// Obtener todos los carritos con los detalles de los productos desde otro microservicio
exports.getAllCarts = async (req, res) => {
  try {
    console.log('Buscando todos los carritos...');

    const carts = await Cart.find(); // Obtener los carritos sin populate

    // Obtener los detalles de cada producto desde el microservicio de productos
    const updatedCarts = await Promise.all(
      carts.map(async (cart) => {
        const itemsWithDetails = await Promise.all(
          cart.items.map(async (item) => {
            try {
              const productResponse = await axios.get(
                `http://localhost:3001/api/products/${item.productId}`
              );
              const product = productResponse.data;
              return { ...item.toObject(), product };
            } catch (error) {
              console.error(
                `Error al obtener el producto ${item.productId}:`,
                error.message
              );
              return { ...item.toObject(), product: null };
            }
          })
        );
        return { ...cart.toObject(), items: itemsWithDetails };
      })
    );

    res.status(200).json(updatedCarts);
  } catch (error) {
    console.error('Error al obtener los carritos:', error.message);
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
};
