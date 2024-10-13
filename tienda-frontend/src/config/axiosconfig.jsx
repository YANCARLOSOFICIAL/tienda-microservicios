import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Cambiar según el puerto de cada microservicio
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
