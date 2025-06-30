// routes/products.js - Public products API
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// GET /api/products - Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, limit = 50 } = req.query;
    
    let query = { isActive: true }; // Only show active products
    
    // Filter by category if provided
    if (category) {
      // If category is a valid ObjectId, use it directly
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        // Otherwise, resolve category name to ObjectId
        const categoryDoc = await Category.findOne({ name: category });
        if (categoryDoc) {
          query.category = categoryDoc._id;
        } else {
          // No such category, return empty result
          return res.json({ success: true, data: { products: [] }, total: 0 });
        }
      }
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    let productsQuery = Product.find(query).populate('category');
    
    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          productsQuery = productsQuery.sort({ price: 1 });
          break;
        case 'price-high':
          productsQuery = productsQuery.sort({ price: -1 });
          break;
        case 'newest':
          productsQuery = productsQuery.sort({ createdAt: -1 });
          break;
        default:
          productsQuery = productsQuery.sort({ createdAt: -1 });
      }
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }
    
    // Limit results
    productsQuery = productsQuery.limit(parseInt(limit));
    
    const products = await productsQuery;
    
    res.json({ 
      success: true, 
      data: { products },
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// POST /api/products - Create a product (for seeding/testing)
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.category) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, price, and category are required' 
      });
    }
    
    // If category is a name, find the category ID
    if (typeof productData.category === 'string' && !productData.category.match(/^[0-9a-fA-F]{24}$/)) {
      const category = await Category.findOne({ name: productData.category });
      if (!category) {
        return res.status(400).json({ 
          success: false, 
          error: `Category '${productData.category}' not found` 
        });
      }
      productData.category = category._id;
    }
    
    // Calculate total stock
    if (productData.colors) {
      productData.totalStock = productData.colors.reduce((acc, color) => acc + (color.stock || 0), 0);
    }
    
    const product = new Product(productData);
    await product.save();
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
});

// GET /api/products/:id - Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    if (!product.isActive) {
      return res.status(404).json({ success: false, error: 'Product not available' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

module.exports = router; 