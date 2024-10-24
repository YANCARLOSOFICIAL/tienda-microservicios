import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';

// Obtener el token del localStorage
const getToken = () => localStorage.getItem('token');

// Configuración de headers con token para autenticación
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'multipart/form-data',
  },
};

// Funciones de servicio para productos
const getProducts = () => axios.get(API_URL);

const addProduct = (product) =>
  axios.post(API_URL, product, axiosConfig);

const updateProduct = (id, product) =>
  axios.put(`${API_URL}/${id}`, product, axiosConfig);

const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

const productService = { getProducts, addProduct, updateProduct, deleteProduct };

export default productService;
