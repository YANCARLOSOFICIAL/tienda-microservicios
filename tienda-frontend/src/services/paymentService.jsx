import axios from 'axios';

const API_URL = 'http://localhost:4000/api/payment';

export const processPayment = async (cartId, total) => {
  try {
    const response = await axios.post(`${API_URL}/pay`, { cartId, total });
    return response.data;
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    throw error;
  }
};
