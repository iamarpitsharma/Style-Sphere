import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../store/CartContext";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  BarChart3,
  Bell,
  MessageCircle,
  MapPin,
  Truck,
  CreditCard,
  HelpCircle,
  Star,
  Clock,
  TrendingUp,
  Filter,
  ArrowRight
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../store/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { authUser, logout } = useAuth();
  const [userRole, setUserRole] = useState("user");
  const { cartItems, wishlistItems } = useAppContext();

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced mock data
  const mockProducts = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      category: "Men",
      subcategory: "Casual Wear",
      price: 1299,
      originalPrice: 1599,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 234,
      brand: "StyleCraft",
      inStock: true,
      tags: ["cotton", "casual", "comfortable"]
    },
    {
      id: 2,
      name: "Denim Jacket Premium",
      category: "Women",
      subcategory: "Outerwear",
      price: 2499,
      originalPrice: 3299,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 456,
      brand: "DenimLux",
      inStock: true,
      tags: ["denim", "jacket", "premium"]
    },
    {
      id: 3,
      name: "Summer Dress Floral",
      category: "Women",
      subcategory: "Dresses",
      price: 1899,
      originalPrice: 2299,
      image: "/placeholder.svg",
      rating: 4.3,
      reviews: 189,
      brand: "FloralFash",
      inStock: false,
      tags: ["summer", "floral", "dress"]
    },
    {
      id: 4,
      name: "Running Sneakers Pro",
      category: "Footwear",
      subcategory: "Sports",
      price: 3299,
      originalPrice: 4199,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 678,
      brand: "SportMax",
      inStock: true,
      tags: ["running", "sports", "comfort"]
    },
    {
      id: 5,
      name: "Formal Business Shirt",
      category: "Men",
      subcategory: "Formal",
      price: 1599,
      originalPrice: 1999,
      image: "/placeholder.svg",
      rating: 4.4,
      reviews: 123,
      brand: "BusinessWear",
      inStock: true,
      tags: ["formal", "business", "shirt"]
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: "order",
      title: "Order Delivered",
      message: "Your order #12345 has been delivered",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "promotion",
      title: "Flash Sale",
      message: "50% off on selected items",
      time: "1 day ago",
      read: false
    }
  ];

  // Popular and recent searches
  useEffect(() => {
    setPopularSearches(["sneakers", "dresses", "jackets", "t-shirts", "formal wear"]);
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    setNotifications(mockNotifications);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((query) => {
    if (query.trim()) {
      // Add to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  }, [recentSearches, navigate]);

  const handleProductClick = (product) => {
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(`/product/${product.id}`);
  };

  const switchRole = (role) => {
    setUserRole(role);
    setIsUserMenuOpen(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : ''
      }`}>
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <Logo />

          {/* Enhanced Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery || recentSearches.length > 0 || popularSearches.length > 0) {
                      setShowSearchResults(true);
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className={`w-full px-4 py-3 pl-12 border-2 rounded-xl transition-all duration-200 ${isSearchFocused
                      ? 'border-pink-500 shadow-lg shadow-pink-500/20'
                      : 'border-gray-200 hover:border-gray-300'
                    } focus:outline-none`}
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-2 top-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Enhanced Search Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl mt-2 max-h-[500px] overflow-hidden z-50">
                  {searchQuery.length === 0 && (
                    <div className="p-4 border-b border-gray-100">
                      {recentSearches.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              Recent Searches
                            </h3>
                            <button
                              onClick={() => {
                                setRecentSearches([]);
                                localStorage.removeItem("recentSearches");
                              }}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              Clear All
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearch(search)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center mb-2">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Popular Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {popularSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearch(search)}
                              className="px-3 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full text-sm transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="flex items-center w-full p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg mr-4 bg-gray-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                                <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                              </div>
                              {!product.inStock && (
                                <span className="ml-2 text-xs text-red-500 font-medium">Out of Stock</span>
                              )}
                            </div>
                            <div className="flex items-center mt-1">
                              <span className="text-sm font-semibold text-pink-600">₹{product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </button>
                      ))}
                      {searchResults.length > 5 && (
                        <div className="p-3 bg-gray-50 text-center">
                          <button
                            onClick={() => handleSearch(searchQuery)}
                            className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                          >
                            View all {searchResults.length} results
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {searchQuery.length > 0 && searchResults.length === 0 && (
                    <div className="p-8 text-center">
                      <div className="text-gray-400 mb-2">
                        <Search className="h-8 w-8 mx-auto" />
                      </div>
                      <p className="text-gray-600">No results found for "{searchQuery}"</p>
                      <p className="text-sm text-gray-500 mt-1">Try searching for something else</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {authUser ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      {notifications.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((notification) => (
                            <button
                              key={notification.id}
                              onClick={() => markNotificationAsRead(notification.id)}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${!notification.read ? 'bg-blue-50' : ''
                                }`}
                            >
                              <div className="flex items-start">
                                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'
                                  }`} />
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No notifications</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {authUser.firstName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden lg:block text-sm font-medium">{authUser.firstName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {authUser.firstName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{authUser.firstName} {authUser.lastName}</p>
                            <p className="text-sm text-gray-500">{authUser.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <Link to="/profile" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <User className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">My Profile</span>
                        </Link>
                        <Link to="/orders" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <Package className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">My Orders</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <Heart className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">Wishlist</span>
                        </Link>
                        <Link to="/addresses" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">Addresses</span>
                        </Link>
                        <Link to="/payments" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <CreditCard className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">Payment Methods</span>
                        </Link>
                        <Link to="/support" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">Help & Support</span>
                        </Link>
                        <Link to="/settings" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                          <Settings className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">Settings</span>
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-3 px-4">
                        <p className="text-xs text-gray-500 mb-3 font-medium">Switch Role:</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => switchRole("user")}
                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${userRole === "user"
                                ? "bg-pink-100 text-pink-700 border border-pink-200"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            User
                          </button>
                          <button
                            onClick={() => switchRole("admin")}
                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${userRole === "admin"
                                ? "bg-pink-100 text-pink-700 border border-pink-200"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      {userRole === "admin" && (
                        <div className="border-t border-gray-100 py-2">
                          <Link to="/admin" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                            <BarChart3 className="h-4 w-4 mr-3 text-gray-500" />
                            <span className="text-gray-700">Admin Dashboard</span>
                          </Link>
                        </div>
                      )}

                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={() => {
                            logout(); // call logout from useAuth()
                            toast.success("Logged out successfully!"); // show toast
                          }}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors"
                >
                  Login
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 text-sm transition-all transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden md:flex items-center hover:text-pink-600 transition-colors">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center hover:text-pink-600 transition-colors group">
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Links */}
        <nav className="hidden md:block border-t border-gray-200">
          <ul className="flex space-x-8 py-4">
            {[
              { name: "HOME", path: "/", color: "text-gray-700 hover:text-pink-600" },
              { name: "ABOUT", path: "/about", color: "text-gray-700 hover:text-pink-600" },
              { name: "BRANDS", path: "/products?category=brands", color: "text-gray-700 hover:text-pink-600" },
              { name: "SALE", path: "/products?category=sale", color: "text-red-600 hover:text-red-700" }
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`${item.color} font-medium transition-all duration-200 relative group ${location.pathname === item.path ? 'text-pink-600' : ''
                    }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-200 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Mobile Navigation */}
            <ul className="space-y-1">
              {[
                { name: "HOME", path: "/" },
                { name: "ABOUT", path: "/about" },
                { name: "BRANDS", path: "/products?category=brands" },
                { name: "SALE", path: "/products?category=sale" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 font-medium transition-all rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile User Actions */}
            {authUser && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <Link
                    to="/wishlist"
                    className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist ({wishlistItems.length})</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Overlay for Mobile */}
      {showSearchResults && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setShowSearchResults(false);
            setIsSearchFocused(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;