import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get('/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      <div className="order-list">
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <h3>Order ID: {order._id}</h3>
            <p>Items: {order.items.length}</p>
            <p>Total: ${order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
