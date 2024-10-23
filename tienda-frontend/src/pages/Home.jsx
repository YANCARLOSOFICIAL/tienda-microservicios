import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Explora lo Mejor en <span>Clicky Shop</span>
          </h1>
          <p className="hero-description">
            Productos exclusivos al alcance de un clic. Compra con confianza y recibe en la puerta de tu hogar.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">Ver Productos</Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image-modern.png" alt="Hero" />
        </div>
      </section>

      {/* Beneficios */}
      <section className="benefits py-5">
        <div className="container text-center">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="benefit-card">
                <img src="/images/shipping.png" alt="Envío rápido" />
                <h5>Envío Rápido</h5>
                <p>Entrega en 24 horas en productos seleccionados.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-card">
                <img src="/images/quality.png" alt="Calidad garantizada" />
                <h5>Calidad Garantizada</h5>
                <p>Ofrecemos solo productos de la más alta calidad.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-card">
                <img src="/images/support.png" alt="Soporte 24/7" />
                <h5>Soporte 24/7</h5>
                <p>Nuestro equipo siempre está disponible para ayudarte.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="section-title text-center">Testimonios de Clientes</h2>
          <div className="row">
            <div className="col-md-6">
              <blockquote className="testimonial">
                “La experiencia de compra fue perfecta y recibí mi pedido muy rápido.”
                <footer>- Sandra L.</footer>
              </blockquote>
            </div>
            <div className="col-md-6">
              <blockquote className="testimonial">
                “Clicky Shop es mi tienda favorita, siempre encuentro lo que busco.”
                <footer>- Juan P.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog py-5">
        <div className="container">
          <h2 className="section-title text-center">Nuestro Blog</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="blog-card">
                <img src="/images/blog-1.jpg" alt="Blog" />
                <h5>Consejos para Comprar Inteligentemente</h5>
                <Link to="/blog" className="btn btn-sm btn-secondary">Leer Más</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog-card">
                <img src="/images/blog-2.jpg" alt="Blog" />
                <h5>Las Últimas Tendencias en Tecnología</h5>
                <Link to="/blog" className="btn btn-sm btn-secondary">Leer Más</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog-card">
                <img src="/images/blog-3.jpg" alt="Blog" />
                <h5>Cómo Ahorrar en Cada Compra</h5>
                <Link to="/blog" className="btn btn-sm btn-secondary">Leer Más</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
