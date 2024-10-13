const Order = require('../models/Order');
const axios = require('axios');

// Crear un pedido
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  // Validar que 'items' sea un array y no esté vacío
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Los productos deben ser un array y no estar vacío.' });
  }

  try {
    // Verificar si el usuario existe en el microservicio de usuarios
    const userResponse = await axios.get(`http://localhost:3002/api/users/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validar cada producto y calcular el precio total
    let totalPrice = 0;
    for (const item of items) {
      const productResponse = await axios.get(`http://localhost:3001/api/products/${item.productId}`);
      if (productResponse.status !== 200) {
        return res.status(404).json({ error: `Producto no encontrado: ${item.productId}` });
      }

      const product = productResponse.data;
      totalPrice += product.price * item.quantity;
    }

    // Crear el pedido
    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      status: 'pending'
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Obtener pedido por ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('userId').populate('items.productId');
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

// Actualizar estado del pedido
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    order.status = status || order.status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

// Eliminar pedido
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};
