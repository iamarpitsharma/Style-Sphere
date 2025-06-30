const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    totalStock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    images: [
      {
        url: { type: String, required: true },
      },
    ],

    colors: [
      {
        name: String,
        value: String,
        stock: { type: Number, default: 0 },
      },
    ],

    sizes: [
        {
        name: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        },
        ],
    
    description: { type: String },
    features: [String],

    specifications: {
      Material: String,
      Fit: String,
      Sleeve: String,
      Neckline: String,
      Care: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
