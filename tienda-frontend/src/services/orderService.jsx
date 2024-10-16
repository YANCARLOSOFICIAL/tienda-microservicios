import axios from 'axios';

const API_URL = 'http://localhost:4000/api/orders'; // Microservicio de pedidos

export const fetchOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders', error);
    throw error;
  }
};
