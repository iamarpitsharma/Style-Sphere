// import { createContext, useContext, useState } from "react";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   // Add item to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Update quantity in cart
//   const updateCartQuantity = (id, newQty) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   // Check if item is in cart
//   const isInCart = (id) => {
//     return cartItems.some((item) => item.id === id);
//   };

//   // Add to wishlist
//   const addToWishlist = (product) => {
//     setWishlistItems((prev) => {
//       if (prev.find((item) => item.id === product.id)) return prev;
//       return [...prev, product];
//     });
//   };

//   // Remove from wishlist
//   const removeFromWishlist = (id) => {
//     setWishlistItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Check if item is in wishlist
//   const isInWishlist = (id) => {
//     return wishlistItems.some((item) => item.id === id);
//   };

//   // Clear all cart items
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Clear all wishlist items
//   const clearWishlist = () => {
//     setWishlistItems([]);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         cartItems,
//         wishlistItems,
//         addToCart,
//         removeFromCart,
//         updateCartQuantity,
//         isInCart,
//         clearCart,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist,
//         clearWishlist,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);


import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const normalizeProduct = (product) => {
  return {
    id: product.id || product._id,
    name: product.name,
    brand: product.brand,
    image: product.image,
    price:
      typeof product.price === "object"
        ? product.price.amount || product.price.value
        : product.price,
    originalPrice:
      typeof product.originalPrice === "object"
        ? product.originalPrice.amount || product.originalPrice.value
        : product.originalPrice,
    discount: product.discount || 0,
    rating: product.rating || 0,
    reviews: product.reviews || 0,
    colors: product.colors || [],
    sizes: product.sizes || [],
    inStock: product.inStock !== false,
  };
};

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    const normalized = normalizeProduct(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === normalized.id);
      if (existing) {
        return prev.map((item) =>
          item.id === normalized.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...normalized, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity in cart
  const updateCartQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Check if item is in cart
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    const normalized = normalizeProduct(product);
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === normalized.id)) return prev;
      return [...prev, normalized];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Check if item is in wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Clear all cart items
  const clearCart = () => {
    setCartItems([]);
  };

  // Clear all wishlist items
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
