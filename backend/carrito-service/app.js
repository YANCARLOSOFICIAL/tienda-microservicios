const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos de carrito'))
  .catch((err) => console.log(err));

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Microservicio de carrito escuchando en el puerto ${PORT}`);
});
