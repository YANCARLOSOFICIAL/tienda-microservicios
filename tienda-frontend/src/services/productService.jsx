import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products'; // URL del microservicio de productos

const getProducts = () => {
  return axios.get(API_URL);
};

const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export default {
  getProducts,
  getProductById
};
