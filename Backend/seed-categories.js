require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const mongoURI = process.env.MONGO_URI;

const categories = [
  { name: "T-Shirts", description: "Trendy t-shirts for all", image: "tshirts.png" },
  { name: "Shirts", description: "Stylish shirts for every occasion", image: "shirts.png" },
  { name: "Jeans", description: "Comfortable and fashionable jeans", image: "jeans.png" },
  { name: "Dresses", description: "Beautiful dresses for women", image: "dresses.png" },
  { name: "Jackets", description: "Warm and cool jackets", image: "jackets.png" },
  { name: "Shoes", description: "Footwear for all", image: "shoes.png" },
];

async function seedCategories() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    for (const cat of categories) {
      const exists = await Category.findOne({ name: cat.name });
      if (exists) {
        console.log(`⚠️  Category already exists: ${cat.name}`);
      } else {
        await Category.create(cat);
        console.log(`✅ Added category: ${cat.name}`);
      }
    }
    console.log('\nCategory seeding completed!');
  } catch (err) {
    console.error('Database connection error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedCategories(); 