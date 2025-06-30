import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { useAppContext } from "../store/CartContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useAppContext();

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link
            to="/products"
            className="bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist ({wishlistItems.length} items)
          </h1>
          <button
            onClick={() => wishlistItems.forEach(item => removeFromWishlist(item.id))}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  {item.discount}% OFF
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
                {item.inStock === false && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 truncate hover:text-pink-600">
                      {item.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  <span className="text-sm text-gray-400 ml-1">({item.reviews})</span>
                </div>

                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{item.price || 0}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{item.originalPrice || ""}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1">
                    {item.colors?.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: typeof color === "object" ? color.hex : color,
                        }}
                      />
                    ))}
                    {item.colors?.length > 3 && (
                      <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    {item.sizes?.slice(0, 3).map((size, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 px-1 py-0.5 rounded"
                      >
                        {typeof size === "object" ? size.label : size}
                      </span>
                    ))}
                    {item.sizes?.length > 3 && (
                      <span className="text-xs text-gray-500">+{item.sizes.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => moveToCart(item)}
                    disabled={!item.inStock}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${item.inStock
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 border border-gray-300 rounded-md hover:border-red-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
