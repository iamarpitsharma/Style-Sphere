
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../axios";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User, Package, Heart, Settings, MapPin, CreditCard,
  Bell, Shield, Edit, Camera
} from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  // All hooks are at the top level, unconditionally:
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      // console.log("[DEBUG] Token in localStorage:", token);
      if (!token || token === "undefined" || token.length < 10) {
        toast.error("You are not logged in. Please login again.");
        logout();
        navigate("/login");
        return;
      }
      try {
        // console.log("[DEBUG] Authorization header:", `Bearer ${token}`);
        const res = await axios.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("[DEBUG] Profile fetched from backend:", res.data.user);
        setProfileData(res.data.user);
      } catch (err) {
        toast.error("Session expired or unauthorized. Please login again.");
        logout();
        navigate("/login");
      }
    };
    fetchProfile();
  }, [logout, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error("Failed to load orders");
      }
    };

    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        toast.error("Could not load wishlist");
      }
    };

    if (activeTab === "wishlist") {
      fetchWishlist();
    }
  }, [activeTab]);


  // Early return to avoid rendering UI when profileData not loaded
  if (!profileData || !profileData.firstName) {
    // console.log("[DEBUG] profileData is not ready:", profileData);
    return <div className="text-center py-10 text-gray-600">Loading profile...</div>;
  }

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const { user } = await response.json(); // ✅ FIX: correctly extract user
      console.log("✅ Profile saved to backend:", user);
      setProfileData(user); // ✅ now UI won’t break
      setIsEditing(false);  // ✅ exit edit mode
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };


  // Sample data that can be moved out or fetched similarly from backend
  // const recentOrders = [
  //   { id: "#ORD-001", date: "2024-01-15", status: "Delivered", total: "₹2,499", items: 2, image: "/placeholder.svg" },
  //   { id: "#ORD-002", date: "2024-01-10", status: "Shipped", total: "₹1,299", items: 1, image: "/placeholder.svg" },
  //   { id: "#ORD-003", date: "2024-01-05", status: "Processing", total: "₹3,999", items: 3, image: "/placeholder.svg" },
  // ];

  // const addresses = [
  //   { id: 1, type: "Home", name: "Arpit Sharma", address: "123 Main Street, Apartment 4B", city: "Mumbai", state: "Maharashtra", pincode: "400001", phone: "+91 9876543210", isDefault: true },
  //   { id: 2, type: "Office", name: "Arpit Sharma", address: "456 Business Park, Office 201", city: "Mumbai", state: "Maharashtra", pincode: "400002", phone: "+91 9876543210", isDefault: false },
  // ];

  const addresses = profileData.addresses || [];

  // const wishlistItems = [
  //   { id: 1, name: "Denim Jacket Premium", brand: "UrbanWear", price: 2499, originalPrice: 3999, image: "/placeholder.svg", inStock: true },
  //   { id: 2, name: "Summer Dress", brand: "FashionHub", price: 1899, originalPrice: 2999, image: "/placeholder.svg", inStock: false },
  // ];

  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profileData?.firstName?.charAt(0)}{profileData?.lastName?.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-pink-600 text-white rounded-full p-1 hover:bg-pink-700">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{profileData?.firstName} {profileData?.lastName}</h3>
                <p className="text-sm text-gray-600">{profileData?.email}</p>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                    <button
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth ? profileData.dateOfBirth.slice(0, 10) : ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={profileData.gender || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={profileData.bio || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                      <input
                        type="text"
                        value={profileData.userType || "individual"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Verified</label>
                      <input
                        type="text"
                        value={profileData.isEmailVerified ? "Yes" : "No"}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                      <input
                        type="text"
                        value={profileData.isActive ? "Active" : "Inactive"}
                        disabled
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${profileData.isActive ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                      />
                    </div>
                  </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-gray-600">You have no orders yet.</p>
                    ) : (
                      orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={order.products[0]?.product?.image || "/placeholder.svg"}
                                alt="Order"
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.products.length} items
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">₹{order.totalPrice}</p>
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : order.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.length === 0 ? (
                      <p className="text-gray-600">No items in your wishlist.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wishlist.map((item) => (
                          <div key={item._id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex space-x-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-gray-500">{item.brand}</p>
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="font-bold text-gray-900">₹{item.price}</span>
                                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                                </div>
                                <div className="mt-2">
                                  {item.inStock ? (
                                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                                      Add to Cart
                                    </button>
                                  ) : (
                                    <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                      Add New Address
                    </button>
                  </div>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{address.name}</h3>
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded">Default</span>
                              )}
                            </div>
                            <p className="text-gray-600">
                              {address.address}
                              <br />
                              {address.city}, {address.state} - {address.pincode}
                              <br />
                              Phone: {address.phone}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">Edit</button>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "payments" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">**** **** **** 1234</p>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">Edit</button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Order Updates</h3>
                        <p className="text-sm text-gray-600">Get notified about your order status</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Promotional Emails</h3>
                        <p className="text-sm text-gray-600">Receive emails about sales and new products</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Get SMS updates for important notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                      <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure</p>
                      <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                        Change Password
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Language & Region</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Tamil</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option>INR (₹)</option>
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="border border-red-200 rounded-lg p-4">
                      <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                      <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back.</p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}