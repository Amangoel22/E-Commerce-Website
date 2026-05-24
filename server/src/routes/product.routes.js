const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Get all products (optionally filter by category)
router.get('/', productController.getProducts);

// Search products by name or description
router.get('/search', productController.searchProducts);

// Get product by ID
router.get('/:id', productController.getProductById);


module.exports = router;
