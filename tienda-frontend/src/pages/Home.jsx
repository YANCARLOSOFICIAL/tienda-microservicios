import React from 'react';

const Home = () => {
  return (
    <div className="container my-5">
      <div className="text-center">
        <h1 className="display-4">bienvenido a  close shop</h1>
        <p className="lead">Explora todos nuestros productos y realiza tu pedido.</p>
        <a href="/products" className="btn btn-primary btn-lg">ver productos</a>
      </div>
    </div>
  );
};

export default Home;
