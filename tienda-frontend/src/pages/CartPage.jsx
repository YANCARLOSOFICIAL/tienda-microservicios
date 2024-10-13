import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axiosInstance.get('/cart')
      .then(response => {
        setCart(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      });
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.productId} className="cart-item">
            <h3>{item.productName}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
