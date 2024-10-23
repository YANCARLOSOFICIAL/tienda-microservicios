import React, { useEffect, useState, useContext } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', stock: '' });
  const [image, setImage] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    productService.getProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al cargar productos:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append('image', image);

    const request = editingProduct
      ? productService.updateProduct(editingProduct._id, data)
      : productService.addProduct(data);

    request
      .then(() => {
        loadProducts();
        setEditingProduct(null);
        setFormData({ name: '', price: '', description: '', stock: '' });
        setImage(null);
      })
      .catch(error => console.error('Error al guardar producto:', error));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleDelete = (id) => {
    productService.deleteProduct(id)
      .then(() => loadProducts())
      .catch(error => console.error('Error al eliminar producto:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Productos</h1>

      {auth?.user?.roles.includes('admin') && (
        <form onSubmit={handleSubmit} className="row g-3 mb-4 product-form">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <textarea
              name="description"
              className="form-control"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="col-md-2">
            <input type="file" className="form-control-file" onChange={handleImageChange} />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              {editingProduct ? 'Editar' : 'Agregar'}
            </button>
          </div>
        </form>
      )}

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <ProductCard
              product={product}
              onEdit={auth?.user?.roles.includes('admin') ? () => handleEdit(product) : null}
              onDelete={auth?.user?.roles.includes('admin') ? () => handleDelete(product._id) : null}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
