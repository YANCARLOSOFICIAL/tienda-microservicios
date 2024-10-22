import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';

const getProducts = () => axios.get(API_URL);
const addProduct = (product) => axios.post(API_URL, product, { headers: { 'Content-Type': 'multipart/form-data' } });
const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product, { headers: { 'Content-Type': 'multipart/form-data' } });
const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

const productService = { getProducts, addProduct, updateProduct, deleteProduct };

export default productService;
