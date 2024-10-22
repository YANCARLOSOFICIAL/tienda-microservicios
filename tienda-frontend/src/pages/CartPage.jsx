import React, { useEffect, useState } from 'react';
import { getAllCarts, removeItemFromCart, clearCart } from '../services/cartService';
import { processPayment } from '../services/paymentService';
import { Button, Card, ListGroup, InputGroup, Form } from 'react-bootstrap';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getAllCarts();
      setCart(data[0]); // Suponemos que hay un solo carrito
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeItemFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      await processPayment(cart._id, total);
      alert('Pago procesado exitosamente');
      setCart(null); // Vaciar el carrito en el frontend
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return <p>Tu carrito está vacío</p>;
  }

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.3;
  const total = subtotal - discount;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito</h2>
      <ListGroup className="cart-items">
        {cart.items.map((item) => (
          <ListGroup.Item key={item.productId} className="cart-item">
            <div className="item-info">
              <img
                src={`http://localhost:3001${item.product.imageUrl}`}
                alt={item.product.name}
                className="item-image"
              />
              <div className="item-details">
                <h5>{item.product.name}</h5>
                <p><strong>Precio:</strong> ${item.product.price}</p>
                <p><strong>Cantidad:</strong> {item.quantity}</p>
              </div>
            </div>
            <Button
              variant="outline-danger"
              onClick={() => handleRemoveItem(item.productId)}
            >
              🗑️
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="cart-summary">
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Descuentos:</strong> -${discount.toFixed(2)}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <div className="cart-actions">
        <Button variant="outline-secondary" onClick={() => clearCart()}>
          Vaciar Carrito
        </Button>
        <Button variant="success" className="pay-button" onClick={handlePayment}>
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
