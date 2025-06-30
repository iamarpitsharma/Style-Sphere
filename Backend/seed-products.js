require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

const mongoURI = process.env.MONGO_URI ;

const categories = [
  'T-Shirts',
  'Shirts',
  'Jeans',
  'Dresses',
  'Jackets',
  'Shoes',
];

const brands = [
  'Nike',
  'Adidas',
  'Zara',
  'H&M',
  "Levi's",
  'Puma',
];

const products = [];
categories.forEach((category) => {
  brands.forEach((brand, i) => {
    products.push({
      name: `${brand} ${category}`,
      description: `High quality ${category} by ${brand}.`,
      price: 999 + i * 100,
      brand,
      categoryName: category, // We'll resolve this to _id
      image: `/images/${category.replace(/\s/g, '').toLowerCase()}_${brand.toLowerCase()}.jpg`,
      countInStock: 10 + i,
    });
  });
});

async function seedProducts() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    for (const productData of products) {
      const category = await Category.findOne({ name: productData.categoryName });
      if (!category) {
        console.log(`❌ Category not found: ${productData.categoryName}`);
        continue;
      }
      const product = new Product({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        brand: productData.brand,
        category: category._id,
        image: productData.image,
        countInStock: productData.countInStock,
      });
      try {
        await product.save();
        console.log(`✅ Added: ${product.name}`);
      } catch (err) {
        console.log(`❌ Failed to add ${product.name}:`, err.message);
      }
    }
    console.log('\nProduct seeding completed!');
  } catch (err) {
    console.error('Database connection error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedProducts(); 