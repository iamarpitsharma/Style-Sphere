import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Homepage from '../page/Homepage';
import Contact from "../page/Contact";
import Login from '../page/Login';
import Signup from '../page/Signup';
import Wishlist from '../page/Wishlist';
import Cart from '../page/Cart';
import CheckoutPage from '../page/Checkout';
import About from '../page/About'; 
import Products from '../page/Products';
import Product from '../page/Product';
import Profile from '../page/Profile';

import AddProductPage from '../page/AddProduct';
import AdminDashboard from '../page/AdminDashboard';

import { Toaster } from "react-hot-toast";
import { useAuth } from "../store/AuthContext";

function ProtectedRoute({ children }) {
  const { authUser } = useAuth();
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '2rem', color: '#e11d48', marginBottom: '1rem' }}>abhi bana nhi h...arpit banyega ye page</h1>
      <Link to="/" style={{
        background: '#e11d48', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem'
      }}>
        Go to Home Page
      </Link>
    </div>
  );
}

function AppRoutes() {
    return (
        <>
        <Toaster position="top-right" />

        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Category Routes */}
            <Route path='/men' element={<Products />} />
            <Route path='/women' element={<Products />} />
            <Route path='/kids' element={<Products />} />
            <Route path='/accessories' element={<Products />} />
            <Route path='/brands' element={<Products />} />
            <Route path='/sale' element={<Products />} />

            <Route path='/admin/*' element={<AdminDashboard />} />
          <Route path='/admin/add_new_product' element={<AddProductPage />} />
          <Route path="/admin/edit_product/:productId" element={<AddProductPage />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
        </>
    );
};

export default AppRoutes