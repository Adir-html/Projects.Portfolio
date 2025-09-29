const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for products
let products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "https://via.placeholder.com/300x200/4F46E5/ffffff?text=Headphones",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "https://via.placeholder.com/300x200/059669/ffffff?text=Smart+Watch",
    description: "Advanced fitness tracking and smartphone integration"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://via.placeholder.com/300x200/DC2626/ffffff?text=Laptop+Stand",
    description: "Ergonomic aluminum laptop stand for better posture"
  }
];

let nextId = 4;

// API Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { name, price, image, description } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    image: image || 'https://via.placeholder.com/300x200/6B7280/ffffff?text=No+Image',
    description: description || ''
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, image, description } = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products[productIndex] = {
    id,
    name,
    price: parseFloat(price),
    image,
    description
  };
  
  res.json(products[productIndex]);
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.status(204).send();
});

// Serve the main app for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});