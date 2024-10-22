import axios from 'axios';

const API_URL = 'http://localhost:3003/api/cart';

// Agregar o actualizar un producto en el carrito
export const addOrUpdateCart = async (productId, quantity) => {
  try {
    const response = await axios.post(API_URL, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error al agregar o actualizar el carrito:', error);
    throw error;
  }
};

// Obtener el carrito completo
export const getCart = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeItemFromCart = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/remove/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    throw error;
  }
};

// Vaciar el carrito
export const clearCart = async () => {
  try {
    const response = await axios.delete(`${API_URL}/clear`);
    return response.data;
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    throw error;
  }
};

// Obtener todos los carritos
export const getAllCarts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los carritos:', error);
    throw error;
  }
};