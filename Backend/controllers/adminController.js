const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getDashboardData = async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Fetch recent 5 orders, with user data populated
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "firstName lastName")
      .lean();

    res.json({
      success: true,
      data: {
        stats: {
          totalRevenue: totalRevenue[0]?.total || 0,
          totalOrders,
          totalProducts,
          totalUsers,
        },
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch dashboard data" });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    // Parse fields from form-data
    const updates = req.body;

    Object.keys(updates).forEach((key) => {
      try {
        // parse if JSON string
        product[key] = JSON.parse(updates[key]);
      } catch {
        product[key] = updates[key];
      }
    });

    // Handle images if needed
    // product.images = [...]; // logic here

    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
