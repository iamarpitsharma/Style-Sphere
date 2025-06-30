import React, { useState, useEffect } from "react";
import { Heart, Star, ShoppingCart, Eye, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../store/CartContext";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCart,
    isInCart,
  } = useAppContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.products || []);
        } else {
          throw new Error(data.message || "Failed to load products");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4 animate-spin">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <p className="text-xl text-gray-600 font-medium">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center bg-red-50 rounded-2xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <p className="text-red-600 font-medium">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Zap className="h-4 w-4 mr-2 animate-pulse" />
            Featured Collection
            <Sparkles className="h-4 w-4 ml-2" />
          </div>
          
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-pink-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Featured Products
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of trending items that everyone's talking about
          </p>
          
          <Link 
            to="/products" 
            className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Product Image Container */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images && product.images[0] ? product.images[0] : "/placeholder.svg?height=400&width=300"}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                </Link>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    {product.discount}% OFF
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group/heart"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`h-5 w-5 transition-all duration-300 ${
                      isInWishlist(product._id) 
                        ? "fill-red-500 text-red-500 animate-pulse" 
                        : "text-gray-400 group-hover/heart:text-red-400"
                    }`}
                  />
                </button>
                
                {/* Quick View Button */}
                <Link
                  to={`/product/${product._id}`}
                  className={`absolute bottom-4 right-4 p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg transition-all duration-300 transform ${
                    hoveredProduct === product._id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  } hover:scale-110`}
                >
                  <Eye className="h-5 w-5" />
                </Link>
              </div>

              {/* Product Details */}
              <div className="p-6 relative z-10">
                {/* Brand and Name */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{product.brand}</p>
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold text-lg text-gray-900 hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 0) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        } transition-colors duration-200`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2 font-medium">
                    {product.rating || "N/A"}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-3 font-medium">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Colors and Add to Cart */}
                <div className="flex items-center justify-between">
                  {/* Color Options */}
                  <div className="flex space-x-2">
                    {product.colors && product.colors.length > 0
                      ? product.colors.slice(0, 4).map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200 transform hover:scale-110"
                            style={{ backgroundColor: color.value || color }}
                            title={color.name || color}
                          />
                        ))
                      : null}
                    {product.colors && product.colors.length > 4 && (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-bold">
                        +{product.colors.length - 4}
                      </div>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product._id)}
                    className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                      isInCart(product._id) 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                    }`}
                  >
                    {isInCart(product._id) ? (
                      <>
                        <span>In Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}