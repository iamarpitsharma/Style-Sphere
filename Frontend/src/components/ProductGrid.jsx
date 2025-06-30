import { useState, useEffect } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../store/CartContext";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductGrid({ viewMode = "grid" , filters, sortBy, selectedCategory }) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const data = await response.json();
      if (data.success) {
        // Transform the products to match the expected format
        const transformedProducts = (data.data.products || data.data || []).map(product => ({
          id: product._id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
          rating: product.rating || 4.0,
          reviews: product.reviews || Math.floor(Math.random() * 500) + 10,
          image: product.images?.[0]?.url || "/placeholder.svg?height=400&width=300",
          colors: product.colors || [],
          sizes: product.sizes || [],
          category: product.category?.name || product.category || "uncategorized"
        }));
        setProducts(transformedProducts);
      } else {
        throw new Error(data.message || "Failed to load products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      // Fallback to sample data if API fails
      setProducts(getSampleProducts());
    } finally {
      setLoading(false);
    }
  };

  const getSampleProducts = () => [
    {
      "id": 1,
      "name": "Men's Classic Cotton T-Shirt",
      "brand": "UrbanThreads",
      "price": 799,
      "originalPrice": 1200,
      "discount": 33,
      "rating": 4.2,
      "reviews": 156,
      "image": "https://placehold.co/300x400/CCCCCC/333333?text=Men's+T-Shirt",
      "colors": ["#000000", "#FFFFFF", "#6A5ACD"],
      "sizes": ["S", "M", "L", "XL"],
      "category": "Men's Fashion"
    },
    {
      "id": 2,
      "name": "Women's High-Waist Skinny Jeans",
      "brand": "FemmeFit",
      "price": 1899,
      "originalPrice": 2800,
      "discount": 32,
      "rating": 4.5,
      "reviews": 89,
      "image": "https://placehold.co/300x400/A0B2C3/FFFFFF?text=Women's+Jeans",
      "colors": ["#4682B4", "#000000", "#708090"],
      "sizes": ["26", "28", "30", "32"],
      "category": "Women's Fashion"
    },
    {
      "id": 3,
      "name": "Kids' Dino Print Hoodie (Unisex)",
      "brand": "LittleExplorers",
      "price": 1199,
      "originalPrice": 1800,
      "discount": 33,
      "rating": 4.7,
      "reviews": 312,
      "image": "https://placehold.co/300x400/98FB98/333333?text=Kids+Dino+Hoodie",
      "colors": ["#3CB371", "#FFD700", "#6A5ACD"],
      "sizes": ["2Y", "4Y", "6Y", "8Y"],
      "category": "Kids Collection"
    },
    {
      "id": 4,
      "name": "Men's Slim Fit Chinos",
      "brand": "ModernMan",
      "price": 1699,
      "originalPrice": 2500,
      "discount": 32,
      "rating": 4.1,
      "reviews": 205,
      "image": "https://placehold.co/300x400/CD853F/FFFFFF?text=Men's+Chinos",
      "colors": ["#8B4513", "#708090", "#2F4F4F"],
      "sizes": ["30", "32", "34", "36"],
      "category": "Men's Fashion"
    },
    {
      "id": 5,
      "name": "Women's Floral Maxi Dress",
      "brand": "BloomAttire",
      "price": 2499,
      "originalPrice": 3900,
      "discount": 36,
      "rating": 4.6,
      "reviews": 110,
      "image": "https://placehold.co/300x400/FFB6C1/333333?text=Women's+Dress",
      "colors": ["#FF69B4", "#DA70D6", "#4682B4"],
      "sizes": ["S", "M", "L", "XL"],
      "category": "Women's Fashion"
    },
    {
      "id": 6,
      "name": "Kids' Graphic Print T-Shirt (Boys)",
      "brand": "TinyTrends",
      "price": 499,
      "originalPrice": 800,
      "discount": 38,
      "rating": 4.3,
      "reviews": 75,
      "image": "https://placehold.co/300x400/ADD8E6/333333?text=Boys+T-Shirt",
      "colors": ["#87CEEB", "#000000", "#FFD700"],
      "sizes": ["3Y", "5Y", "7Y"],
      "category": "Kids Collection"
    },
    {
      "id": 7,
      "name": "Men's Casual Denim Jacket",
      "brand": "RuggedWear",
      "price": 2899,
      "originalPrice": 4200,
      "discount": 31,
      "rating": 4.4,
      "reviews": 450,
      "image": "https://placehold.co/300x400/6A5ACD/FFFFFF?text=Men's+Denim+Jacket",
      "colors": ["#4169E1", "#000000"],
      "sizes": ["M", "L", "XL"],
      "category": "Men's Fashion"
    },
    {
      "id": 8,
      "name": "Women's Comfort Leggings",
      "brand": "ActiveLife",
      "price": 999,
      "originalPrice": 1500,
      "discount": 33,
      "rating": 4.5,
      "reviews": 92,
      "image": "https://placehold.co/300x400/DA70D6/333333?text=Women's+Leggings",
      "colors": ["#9370DB", "#000000", "#778899"],
      "sizes": ["S", "M", "L"],
      "category": "Women's Fashion"
    },
    {
      "id": 9,
      "name": "Kids' Glitter Tulle Skirt (Girls)",
      "brand": "DreamWear",
      "price": 799,
      "originalPrice": 1300,
      "discount": 38,
      "rating": 4.8,
      "reviews": 180,
      "image": "https://placehold.co/300x400/FFC0CB/333333?text=Girls+Skirt",
      "colors": ["#FF69B4", "#F08080", "#FFFFFF"],
      "sizes": ["3Y", "5Y", "7Y"],
      "category": "Kids Collection"
    },
    {
      "id": 10,
      "name": "Men's Hooded Sweatshirt",
      "brand": "ComfyCore",
      "price": 1499,
      "originalPrice": 2200,
      "discount": 32,
      "rating": 4.0,
      "reviews": 280,
      "image": "https://placehold.co/300x400/C0C0C0/333333?text=Men's+Hoodie",
      "colors": ["#696969", "#000000", "#2F4F4F"],
      "sizes": ["S", "M", "L", "XL"],
      "category": "Men's Fashion"
    },
    {
      "id": 11,
      "name": "Women's Stylish Blouse",
      "brand": "EleganceNow",
      "price": 1599,
      "originalPrice": 2400,
      "discount": 33,
      "rating": 4.3,
      "reviews": 60,
      "image": "https://placehold.co/300x400/E6E6FA/333333?text=Women's+Blouse",
      "colors": ["#FFFFFF", "#4682B4", "#DA70D6"],
      "sizes": ["XS", "S", "M", "L"],
      "category": "Women's Fashion"
    },
    {
      "id": 12,
      "name": "Kids' Casual Jogger Pants (Unisex)",
      "brand": "PlayTime",
      "price": 899,
      "originalPrice": 1300,
      "discount": 31,
      "rating": 4.5,
      "reviews": 130,
      "image": "https://placehold.co/300x400/BDB76B/333333?text=Kids+Joggers",
      "colors": ["#8B4513", "#2F4F4F", "#D8BFD8"],
      "sizes": ["2Y", "4Y", "6Y", "8Y"],
      "category": "Kids Collection"
    },
    {
      "id": 13,
      "name": "Men's Polo Shirt",
      "brand": "SportyChic",
      "price": 999,
      "originalPrice": 1500,
      "discount": 33,
      "rating": 4.4,
      "reviews": 210,
      "image": "https://placehold.co/300x400/D3D3D3/333333?text=Men's+Polo",
      "colors": ["#000000", "#FFFFFF", "#4169E1"],
      "sizes": ["S", "M", "L", "XL"],
      "category": "Men's Fashion"
    },
    {
      "id": 14,
      "name": "Women's A-Line Skirt",
      "brand": "RetroVibe",
      "price": 1299,
      "originalPrice": 1900,
      "discount": 32,
      "rating": 4.2,
      "reviews": 45,
      "image": "https://placehold.co/300x400/D8BFD8/333333?text=Women's+Skirt",
      "colors": ["#8A2BE2", "#4B0082", "#FF69B4"],
      "sizes": ["XS", "S", "M", "L"],
      "category": "Women's Fashion"
    },
    {
      "id": 15,
      "name": "Kids' Rain Boots (Unisex)",
      "brand": "PuddleJumpers",
      "price": 699,
      "originalPrice": 1000,
      "discount": 30,
      "rating": 4.7,
      "reviews": 500,
      "image": "https://placehold.co/300x400/98FB98/333333?text=Kids+Rain+Boots",
      "colors": ["#32CD32", "#FFD700", "#4169E1"],
      "sizes": ["K8", "K10", "K12"],
      "category": "Kids Collection"
    },
    {
      "id": 16,
      "name": "Men's Formal Shirt",
      "brand": "ExecutiveWear",
      "price": 1999,
      "originalPrice": 3000,
      "discount": 33,
      "rating": 4.6,
      "reviews": 100,
      "image": "https://placehold.co/300x400/ADD8E6/333333?text=Men's+Formal+Shirt",
      "colors": ["#FFFFFF", "#4682B4", "#000000"],
      "sizes": ["S", "M", "L", "XL"],
      "category": "Men's Fashion"
    },
    {
      "id": 17,
      "name": "Women's Cardigan Sweater",
      "brand": "CozyChic",
      "price": 1699,
      "originalPrice": 2500,
      "discount": 32,
      "rating": 4.3,
      "reviews": 70,
      "image": "https://placehold.co/300x400/B0C4DE/333333?text=Women's+Cardigan",
      "colors": ["#778899", "#DA70D6", "#6A5ACD"],
      "sizes": ["S", "M", "L"],
      "category": "Women's Fashion"
    },
    {
      "id": 18,
      "name": "Kids' Denim Overalls (Unisex)",
      "brand": "TinyThreads",
      "price": 1399,
      "originalPrice": 2100,
      "discount": 33,
      "rating": 4.5,
      "reviews": 320,
      "image": "https://placehold.co/300x400/A0B2C3/FFFFFF?text=Kids+Overalls",
      "colors": ["#4682B4", "#000000"],
      "sizes": ["2Y", "4Y", "6Y"],
      "category": "Kids Collection"
    },
    {
      "id": 19,
      "name": "Men's Boxer Briefs (3-Pack)",
      "brand": "UnderEssentials",
      "price": 599,
      "originalPrice": 900,
      "discount": 33,
      "rating": 4.0,
      "reviews": 55,
      "image": "https://placehold.co/300x400/8B4513/FFFFFF?text=Men's+Boxers",
      "colors": ["#A52A2A", "#000000", "#708090"],
      "sizes": ["S", "M", "L", "XL"],
      "category": "Men's Fashion"
    },
    {
      "id": 20,
      "name": "Women's Crossbody Bag",
      "brand": "CarryChic",
      "price": 1499,
      "originalPrice": 2200,
      "discount": 32,
      "rating": 4.6,
      "reviews": 140,
      "image": "https://placehold.co/300x400/FFC0CB/333333?text=Women's+Bag",
      "colors": ["#FF69B4", "#DA70D6", "#000000"],
      "sizes": ["One Size"],
      "category": "Accessories"
    }
  ];

  let filteredProducts = products;

  // Filter by selected category from URL
  if (selectedCategory) {
    const categoryMap = {
      "men": "Men's Fashion",
      "women": "Women's Fashion", 
      "kids": "Kids Collection",
      "accessories": "Accessories"
    };
    
    const targetCategory = categoryMap[selectedCategory];
    if (targetCategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === targetCategory
      );
    }
  }

  if (filters.category.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.category.includes(product.category)
    );
  }

  if (filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.brand.includes(product.brand)
    );
  }

  if (filters.size.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      product.sizes.some(size => filters.size.includes(size))
    );
  }

  //sorting 
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Error loading products: {error}</p>
        <button 
          onClick={fetchProducts}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg mb-2">No products found</p>
        <p className="text-gray-400">Try adjusting your filters or browse all products</p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistItems.some((item) => item.id === product.id);
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                      <span className="text-sm text-green-600 ml-2">{product.discount}% off</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Heart
                        className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                      />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => {
        const isWishlisted = wishlistItems.some((item) => item.id === product.id);
        return (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div className="relative overflow-hidden rounded-t-lg">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                {product.discount}% OFF
              </div>
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 truncate hover:text-pink-600">{product.name}</h3>
                </Link>
              </div>

              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
              </div>

              <div className="flex items-center mb-3">
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
