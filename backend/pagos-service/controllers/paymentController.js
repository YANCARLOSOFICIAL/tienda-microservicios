const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { cartId, total } = req.body;

  if (!cartId || !total) {
    return res.status(400).json({ error: 'Faltan datos para procesar el pago' });
  }

  try {
    // Simular pago exitoso
    console.log(`Procesando pago de $${total} para el carrito ${cartId}`);

    // Vaciar el carrito una vez se haya procesado el pago
    await axios.delete(`http://localhost:3003/api/cart/clear`);

    res.status(200).json({ message: 'Pago procesado exitosamente' });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};
