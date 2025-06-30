// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const authMiddleware = require('../middleware/authMiddleware'); // Protect admin routes
const adminMiddleware = require('../middleware/adminMiddleware'); // Ensure admin access

// GET /api/admin/categories - fetch all categories (for frontend)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/admin/categories - add new category (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ success: false, error: 'Category already exists' });

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT /api/admin/categories/:id - update category (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

    // Check if name already exists (excluding current category)
    const exists = await Category.findOne({ name, _id: { $ne: req.params.id } });
    if (exists) return res.status(400).json({ success: false, error: 'Category name already exists' });

    category.name = name;
    category.description = description;
    await category.save();

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/admin/categories/:id - delete category (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
