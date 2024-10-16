import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders', error);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
