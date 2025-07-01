require("dotenv").config();
const Product = require("../models/Product");

const safeJsonParse = (value, defaultValue) => {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value);
  } catch {
    return defaultValue;
  }
};


exports.createProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const body = req.body;
    const images = [];

    const baseUrl = process.env.BASE_URL || "http://localhost:5000"; // or your backend URL

    if (req.files?.length > 0) {
      req.files.forEach((file) => {
        images.push({ url: `${baseUrl}/uploads/${file.filename}` });
      });
    }
    // if (req.files?.length > 0) {
    //   req.files.forEach((file) => {
    //     images.push({ url: `/uploads/${file.filename}` }); // assuming you use multer
    //   });
    // }

    const parsedData = {
      ...body,
      price: Number(body.price),
      originalPrice: Number(body.originalPrice),
      colors: safeJsonParse(body.colors, []),
      sizes: safeJsonParse(body.sizes, []),
      tags: safeJsonParse(body.tags, []),
      specifications: safeJsonParse(body.specifications, {}),
      features: safeJsonParse(body.features, []),
      images,
      totalStock: safeJsonParse(body.colors, []).reduce((acc, color) => acc + Number(color.stock || 0), 0),
    };

    const product = await Product.create(parsedData);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Product creation failed" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json({ success: true, data: { products } });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};

exports.bulkDeleteProducts = async (req, res) => {
  try {
    const { productIds } = req.body;
    await Product.deleteMany({ _id: { $in: productIds } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Bulk delete failed" });
  }
};
