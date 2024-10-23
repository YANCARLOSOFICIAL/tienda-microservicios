import React, { useState } from 'react';
import { Card, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { addOrUpdateCart } from '../services/cartService';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Controlar cambios en la cantidad seleccionada
  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  // Función para agregar al carrito
  const handleAddToCart = async () => {
    try {
      await addOrUpdateCart(product._id, quantity);
      setShowModal(true); // Mostrar modal de confirmación
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // Cerrar el modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="h-100 product-card shadow-sm">
      <Card.Img
        variant="top"
        src={`http://localhost:3001${product.imageUrl}`}
        alt={product.name}
        className="product-image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{product.name}</Card.Title>
        <Card.Text className="text-center">${product.price}</Card.Text>

        {/* Control de cantidad */}
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

        <div className="d-flex justify-content-between mt-auto">
          <Button variant="success" onClick={handleAddToCart}>
            Agregar al Carrito
          </Button>
          {onEdit && <Button variant="warning" onClick={onEdit}>Editar</Button>}
          {onDelete && <Button variant="danger" onClick={onDelete}>Eliminar</Button>}
        </div>
      </Card.Body>

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto Añadido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{product.name}</strong> ha sido agregado al carrito con cantidad: {quantity}.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Continuar Comprando
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
