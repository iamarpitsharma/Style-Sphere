import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Eye,
  Home,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  RefreshCw,
  Tag,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import AddProductPage from "./AddProduct";
import CategoryManagement from "../components/CategoryManagement";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleUserOrders, setVisibleUserOrders] = useState([]);
  const validTabs = ["overview", "products", "orders", "users", "categories"];

  // Sync activeTab with URL path
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    // Example: "/admin/products" => pathParts = ["", "admin", "products"]
    const tabFromUrl = pathParts[2];

    if (validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else {
      // If no valid tab in URL, redirect to overview tab URL
      setActiveTab("overview");
      if (location.pathname === "/admin") {
        navigate("/admin/overview", { replace: true });
      }
    }
  }, [location.pathname]);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setDashboardData(data.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setProducts(data.data.products);
    } catch (err) {
      console.error("Products fetch error:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setUsers(data.data);
    } catch (err) {
      console.error("Users fetch error:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setOrders(data.data.orders);
    } catch (err) {
      console.error("Orders fetch error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.error("Categories fetch error:", err);
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case "products": fetchProducts(); break;
      case "users": fetchUsers(); break;
      case "orders": fetchOrders(); break;
      case "categories": fetchCategories(); break;
      default: break;
    }
  }, [activeTab]);

  const handleViewProduct = (id) => {
    navigate(`/admin/products/${id}`);
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/edit_product/${id}`);
  };

  const toggleUserInfo = (orderId) => {
    setVisibleUserOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      alert("An error occurred while deleting the user");
    }
  };


  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        alert("Product deleted successfully");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedItems.length) return alert("No items selected");
    if (!window.confirm("Delete selected items?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productIds: selectedItems }),
      });
      const data = await response.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => !selectedItems.includes(p._id)));
        setSelectedItems([]);
        alert("Bulk delete successful");
      }
    } catch (err) {
      alert("Bulk delete failed");
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === products.length ? [] : products.map((p) => p._id)
    );
  };

  const stats = dashboardData?.stats || {};

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.totalRevenue?.toLocaleString() || 0}`, change: "+12.5%", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Total Orders", value: stats.totalOrders?.toLocaleString() || 0, change: "+8.2%", icon: ShoppingCart, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Total Products", value: stats.totalProducts?.toLocaleString() || 0, change: "+3.1%", icon: Package, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Total Users", value: stats.totalUsers?.toLocaleString() || 0, change: "+15.3%", icon: Users, color: "text-orange-600", bgColor: "bg-orange-100" },
  ];

  // const navigate = useNavigate();

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-pink-600" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );

  return (

    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">StyleSphere Admin Dashboard</h1>
          <div className="bg-gradient-to-r rounded-2xl from-pink-50 via-purple-50 to-pink-50 flex pt-5 px-4 sm:px-6 lg:px-8 ">
            <Link
              to="/"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm mb-4 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Return to Homepage
            </Link>
          </div>
          <button
            onClick={fetchDashboardData}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen p-4">
          <ul className="space-y-2">
            {["overview", "products", "orders", "users", "categories"].map((tab, i) => {
              const icons = [BarChart3, Package, ShoppingCart, Users, Tag];
              return (
                <li key={tab}>
                  <button
                    // onClick={() => setActiveTab(tab)}
                    onClick={() => navigate(`/admin/${tab}`)}

                    className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${activeTab === tab ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {React.createElement(icons[i], { className: "h-5 w-5 mr-3" })} {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData?.recentOrders?.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order._id.slice(-6)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.user?.firstName} {order.user?.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.totalPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Products Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Products Management</h2>
                <div className="flex space-x-4">
                  {selectedItems.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected ({selectedItems.length})
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/admin/add_new_product")}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </button>
                </div>
              </div>

              {/* Products Filters */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedItems.length === products.length && products.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(product._id)}
                              onChange={() => handleSelectItem(product._id)}
                              className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={product.images?.[0]?.url || "/placeholder.svg?height=40&width=40"}
                                alt={product.name}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.category?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.totalStock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                            >
                              {product.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {/* <button
                              onClick={() => handleViewProduct(product._id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Product"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditProduct(product._id)}
                                className="text-pink-600 hover:text-pink-900"
                                title="Edit Product"
                              >
                                <Edit className="h-4 w-4" />
                              </button> */}
                              <button
                                onClick={() => navigate(`/admin/edit_product/${product._id}`)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit Product"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Orders Management</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order._id.slice(-6)}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user?.firstName} {order.user?.lastName}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {visibleUserOrders.includes(order._id) ? (
                            <em>User info hidden</em>
                          ) : (
                            <>
                              {order.user?.firstName} {order.user?.lastName}
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.totalPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleUserInfo(order._id)}
                            className="text-pink-600 hover:text-pink-900 mr-3"
                            title={visibleUserOrders.includes(order._id) ? "Show User Info" : "Hide User Info"}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Users Management</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users && users.length > 0 ? (users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                              <span className="text-pink-600 font-medium">{user.firstName?.charAt(0) || "U"}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalOrders || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{user.totalSpent || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {/* <button className="text-pink-600 hover:text-pink-900 mr-3">View</button>
                          <button className="text-red-600 hover:text-red-900">Block</button> */}
                          <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <CategoryManagement />
          )}
        </main>
      </div>
    </div>
  );
}
