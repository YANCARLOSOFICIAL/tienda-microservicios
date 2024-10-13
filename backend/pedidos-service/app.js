const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conectar a la base de datos de pedidos
mongoose.connect('mongodb://localhost:27017/pedidos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a la base de datos de pedidos');
}).catch((error) => {
  console.error('Error conectando a la base de datos:', error);
});

// Rutas de pedidos
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

// Puedes agregar un middleware simple para monitorear las solicitudes HTTP que llegan
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Puerto
const PORT = process.env.PORT || 4000;

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor de pedidos corriendo en el puerto ${PORT}`);
});
