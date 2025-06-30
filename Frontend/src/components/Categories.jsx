import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShoppingBag, Star, Zap } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/categories`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        // Map API categories to frontend format
        const mappedCategories = data.data.map(category => ({
          _id: category._id,
          name: category.name,
          image: getCategoryImage(category.name),
          link: getCategoryLink(category.name),
          description: getCategoryDescription(category.name),
          color: getCategoryColor(category.name)
        }));
        setCategories(mappedCategories);
      } else {
        // Fallback to default categories if API fails or no categories
        setCategories(getDefaultCategories());
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback to default categories if API fails
      setCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const getCategoryImage = (categoryName) => {
    const imageMap = {
      "Men's Fashion": "/Homepage/Mens.png?height=300&width=300",
      "Women's Fashion": "/Homepage/Women.png?height=300&width=300", 
      "Kids Collection": "/Homepage/Kid.png?height=300&width=300",
      "Accessories": "/Homepage/Belt.png?height=300&width=300"
    };
    return imageMap[categoryName] || "/placeholder.svg?height=300&width=300";
  };

  const getCategoryLink = (categoryName) => {
    const linkMap = {
      "Men's Fashion": "/men",
      "Women's Fashion": "/women",
      "Kids Collection": "/kids", 
      "Accessories": "/accessories"
    };
    return linkMap[categoryName] || "/products";
  };

  const getCategoryDescription = (categoryName) => {
    const descriptionMap = {
      "Men's Fashion": "Trendy styles for the modern man",
      "Women's Fashion": "Elegant designs for every occasion",
      "Kids Collection": "Fun and comfortable kids wear",
      "Accessories": "Complete your perfect look"
    };
    return descriptionMap[categoryName] || "Discover amazing products";
  };

  const getCategoryColor = (categoryName) => {
    const colorMap = {
      "Men's Fashion": "from-blue-500 to-cyan-500",
      "Women's Fashion": "from-pink-500 to-rose-500",
      "Kids Collection": "from-yellow-500 to-orange-500",
      "Accessories": "from-purple-500 to-indigo-500"
    };
    return colorMap[categoryName] || "from-gray-500 to-gray-600";
  };

  const getDefaultCategories = () => [
    {
      _id: "men",
      name: "Men's Fashion",
      image: "/Homepage/Mens.png?height=300&width=300",
      link: "/men",
      description: "Trendy styles for the modern man",
      color: "from-blue-500 to-cyan-500"
    },
    {
      _id: "women", 
      name: "Women's Fashion",
      image: "/Homepage/Women.png?height=300&width=300",
      link: "/women",
      description: "Elegant designs for every occasion",
      color: "from-pink-500 to-rose-500"
    },
    {
      _id: "kids",
      name: "Kids Collection", 
      image: "/Homepage/Kid.png?height=300&width=300",
      link: "/kids",
      description: "Fun and comfortable kids wear",
      color: "from-yellow-500 to-orange-500"
    },
    {
      _id: "accessories",
      name: "Accessories",
      image: "/Homepage/Belt.png?height=300&width=300", 
      link: "/accessories",
      description: "Complete your perfect look",
      color: "from-purple-500 to-indigo-500"
    },
  ];

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 animate-spin">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">Loading amazing categories...</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl animate-pulse shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Explore Categories
            <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
          </div>
          
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Shop by Category
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect style across our curated collections
          </p>
        </div>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category._id}
              to={category.link}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-2"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCategory(category._id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Category Image Container */}
              <div className="aspect-square relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Floating Elements */}
                <div className={`absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                  hoveredCategory === category._id ? 'scale-125 rotate-12' : ''
                }`}>
                  <Star className="h-4 w-4 text-white" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                    <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-4 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {category.description}
                    </p>
                    
                    {/* Explore Button */}
                    <div className={`inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      hoveredCategory === category._id ? 'bg-white/30 transform scale-105' : ''
                    }`}>
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                
                {/* Hover Sparkle Effect */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                  hoveredCategory === category._id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                  <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-500"></div>
                </div>
              </div>
              
              {/* Enhanced Bottom Section */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transform transition-all duration-300 group-hover:from-black/90">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className={`p-2 bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    hoveredCategory === category._id ? 'bg-white/30 rotate-45' : ''
                  }`}>
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Browse All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}