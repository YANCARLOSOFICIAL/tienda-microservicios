import React, { useEffect, useState } from 'react';
import { fetchAllCarts } from '../services/cartService';

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null);

  const loadAllCarts = async () => {
    try {
      const allCarts = await fetchAllCarts();
      setCarts(allCarts);
    } catch (error) {
      setError('Error al cargar los carritos');
    }
  };

  useEffect(() => {
    loadAllCarts();
  }, []);

  return (
    <div>
      <h2>Todos los Carritos</h2>
      {error && <p>{error}</p>}
      {carts.length > 0 ? (
        carts.map((cart) => (
          <div key={cart._id}>
            <h3>Carrito de {cart.userId}</h3>
            {cart.items.map((item) => (
              <div key={item.productId._id}>
                <p>Producto: {item.productId.name}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No se encontraron carritos.</p>
      )}
    </div>
  );
};

export default CartPage;
