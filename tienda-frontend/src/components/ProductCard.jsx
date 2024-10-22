import React, { useState } from 'react';
import { Card, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { addOrUpdateCart } from '../services/cartService';
import '../styles/ProductCard.css';


const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta)); // Evitar cantidad menor a 1
  };

  const handleAddToCart = async () => {
    try {
      await addOrUpdateCart(product._id, quantity);
      setShowModal(true); // Mostrar modal de confirmación
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={`http://localhost:3001${product.imageUrl}`}
        alt={product.name}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>ID del producto:</strong> {product._id}
        </Card.Text>
        <Card.Text>
          <strong>Precio:</strong> ${product.price}
        </Card.Text>

        <InputGroup className="mb-3">
          <Button variant="outline-secondary" onClick={() => handleQuantityChange(-1)}>
            -
          </Button>
          <Form.Control
            type="text"
            value={quantity}
            readOnly
            style={{ width: '50px', textAlign: 'center' }}
          />
          <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)}>
            +
          </Button>
        </InputGroup>

        <Button variant="success" onClick={handleAddToCart} className="w-100">
          Agregar al Carrito
        </Button>
      </Card.Body>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto Agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{product.name}</strong> se ha añadido al carrito con cantidad: {quantity}.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Continuar comprando
          </Button>
          <Button variant="primary" onClick={() => window.location.href = '/cart'}>
            Ver Carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ProductCard;
