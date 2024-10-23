import axios from 'axios';

const API_URL = 'http://localhost:3002/api/users'; // Cambia la URL si es necesario

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  const { token } = response.data;
  localStorage.setItem('token', token); // Guardar el token en localStorage
  return token;
};

export const getUserDetails = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
