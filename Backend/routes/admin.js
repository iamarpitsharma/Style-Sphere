const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { updateProduct } = require("../controllers/adminController");

router.put("/products/:id", authMiddleware,   upload.array("images", 5),
 updateProduct);

router.post(
  '/products',
  authMiddleware,
  upload.array('images', 5), 
  productController.createProduct
);
router.get("/products", authMiddleware, productController.getAllProducts);
router.delete("/products/:id", authMiddleware, productController.deleteProduct);
router.post("/products/bulk-delete", authMiddleware, productController.bulkDeleteProducts);
// Route: GET /api/admin/products/:id
const { getProductById } = require("../controllers/productController");
router.get("/products/:id", authMiddleware, getProductById);


// Categories endpoint (if needed, use a similar controller)
const Category = require("../models/Category");
router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch {
    res.status(500).json({ success: false, error: "Could not fetch categories" });
  }
});


// New endpoints for Admin dashboard

const User = require("../models/User");
const Order = require("../models/Order");

// DELETE /api/admin/users/:id
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all users
router.get("/users", authMiddleware,adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().lean();
    // Calculate totalOrders and totalSpent for each user
    const userIds = users.map((u) => u._id);
    const ordersByUser = await Order.aggregate([
      { $match: { user: { $in: userIds } } },
      {
        $group: {
          _id: "$user",
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalPrice" },
        },
      },
    ]);
    // Map orders data to users
    const ordersMap = {};
    ordersByUser.forEach((o) => {
      ordersMap[o._id.toString()] = o;
    });
    const usersWithStats = users.map((user) => ({
      ...user,
      totalOrders: ordersMap[user._id.toString()]?.totalOrders || 0,
      totalSpent: ordersMap[user._id.toString()]?.totalSpent || 0,
      status: "active", // You can customize user status if you want
    }));

    res.json({ success: true, data: usersWithStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

// Get all orders
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: { orders } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
});

// Dashboard summary
router.get("/dashboard", authMiddleware, adminController.getDashboardData);


module.exports = router;
