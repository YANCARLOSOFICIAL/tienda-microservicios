const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Inicializamos la app de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos de productos'))
  .catch((err) => console.log(err));

// Rutas
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Microservicio de productos escuchando en el puerto ${PORT}`);
});
