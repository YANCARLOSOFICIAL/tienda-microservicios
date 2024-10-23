import React, { useState, useContext } from 'react';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Alert, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Usar la función login desde el contexto
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = await loginUser(credentials); // Obtener el token desde la API
      login(token); // Llamar la función login del contexto
      alert('Login exitoso.');
      navigate('/products');
    } catch (error) {
      console.error('Error en login:', error);
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow-lg custom-card">
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Ingresa tu correo"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Iniciar Sesión
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <a href="/register" className="text-decoration-none">
                    ¿No tienes una cuenta? Regístrate aquí
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
