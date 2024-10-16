import axios from 'axios';

const API_URL = 'http://localhost:3003/api/cart';

// Obtener el carrito de un usuario
export const fetchCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart for user', error);
    throw error;
  }
};

// Obtener todos los carritos
export const fetchAllCarts = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/cart/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all carts', error);
    throw error;
  }
};

// Agregar un producto al carrito
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(API_URL, { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart', error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing product from cart', error);
    throw error;
  }
};

