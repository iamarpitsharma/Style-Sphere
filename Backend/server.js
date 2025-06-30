require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173','https://style-sphere-blond.vercel.app'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI ;
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
  // Routes
  app.get('/', (req, res) => {
    res.send('API is running');
  });
  const wishlistRoutes = require("./routes/wishlist");
  app.use("/api/wishlist", wishlistRoutes);
  
  const orderRoutes = require("./routes/order");
  app.use("/api/orders", orderRoutes);
app.use("/api/auth/profile", require("./routes/profile"));
app.use("/api/user", require("./routes/profile"));

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: "Backend working!" });
});



// Public routes (no authentication required)
app.use('/api/products', require('./routes/products'));

// Auth routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/categories', require('./routes/category'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 