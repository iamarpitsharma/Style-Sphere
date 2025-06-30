import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { useParams } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;


export default function AddProductPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    brand: "",
    category: "",
    colors: [{ name: "", value: "#000000", stock: 0 }],
    sizes: [{ name: "", stock: 0 }],
    features: [""],
    specifications: {
      material: "",
      fit: "",
      sleeve: "",
      neckline: "",
      care: "",
    },
    tags: [""],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

 const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      setCategories(data.data);
    } else {
      console.error("API error:", data.message || data.error);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

  const { productId } = useParams();

useEffect(() => {
  if (productId) {
    fetchProduct(productId);
  }
}, [productId]);

  const fetchProduct = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    if (data.success) {
      const product = data.data;
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        brand: product.brand || "",
        category: product.category || "",
        colors: product.colors || [{ name: "", value: "#000000", stock: 0 }],
        sizes: product.sizes || [{ name: "", stock: 0 }],
        features: product.features || [""],
        specifications: product.specifications || {
          material: "",
          fit: "",
          sleeve: "",
          neckline: "",
          care: "",
        },
        tags: product.tags || [""],
      });
    }
  } catch (err) {
    console.error("Error fetching product:", err);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecificationChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };

  const handleArrayChange = (index, field, value, arrayName) => {
  setFormData((prev) => ({
    ...prev,
    [arrayName]: prev[arrayName].map((item, i) =>
      i === index
        ? typeof item === "object"
          ? { ...item, [field]: value }
          : value
        : item
    ),
  }));
};


  const addArrayItem = (arrayName, defaultItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem],
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      submitData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
    });

    images.forEach((image) => submitData.append("images", image));

    const url = productId
      ? `${API_BASE_URL}/api/admin/products/${productId}` // Update
      : `${API_BASE_URL}/api/admin/products`; // Create

    const method = productId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: submitData,
    });

    const data = await response.json();

    if (data.success) {
      alert(`Product ${productId ? "updated" : "created"} successfully!`);
      navigate("/admin/products");
    } else {
      alert(data.error || `Error ${productId ? "updating" : "creating"} product`);
    }
  } catch (error) {
    console.error(`Error ${productId ? "updating" : "creating"} product:`, error);
    alert(`Error ${productId ? "updating" : "creating"} product`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <button onClick={() => navigate("/admin/products")} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter original price"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>


              

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Images</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload product images (Max 5 images)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-700 transition-colors"
                >
                  Choose Images
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Colors & Stock</h2>
            <div className="space-y-4">
              {formData.colors.map((color, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Name</label>
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => handleArrayChange(index, "name", e.target.value, "colors")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="e.g., Red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Value</label>
                    <input
                      type="color"
                      value={color.value}
                      onChange={(e) => handleArrayChange(index, "value", e.target.value, "colors")}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                    <input
                      type="number"
                      value={color.stock}
                      onChange={(e) =>
                        handleArrayChange(index, "stock", Number.parseInt(e.target.value) || 0, "colors")
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    {formData.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "colors")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("colors", { name: "", value: "#000000", stock: 0 })}
                className="flex items-center text-pink-600 hover:text-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Color
              </button>
            </div>
          </div>

          {/* Sizes & Stock */}
<div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">Sizes</h2>
  <div className="space-y-4">
    {formData.sizes.map((size, index) => (
      <div key={index} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
          <input
            type="text"
            value={size.name}
            onChange={(e) => handleArrayChange(index, "name", e.target.value, "sizes")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., M"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            value={size.stock}
            onChange={(e) => handleArrayChange(index, "stock", Number(e.target.value) || 0, "sizes")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          {formData.sizes.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(index, "sizes")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={() => addArrayItem("sizes", { name: "", stock: 0 })}
      className="flex items-center text-pink-600 hover:text-pink-700"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Size
    </button>
  </div>
          </div>
          
          {/* Features */}
<div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">Features</h2>
  <div className="space-y-4">
    {formData.features.map((feature, index) => (
      <div key={index} className="flex items-center gap-4">
        <input
          type="text"
          value={feature}
          onChange={(e) => handleArrayChange(index, "", e.target.value, "features")}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="e.g., Machine Washable"
        />
        {formData.features.length > 1 && (
          <button
            type="button"
            onClick={() => removeArrayItem(index, "features")}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={() => addArrayItem("features", "")}
      className="flex items-center text-pink-600 hover:text-pink-700"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Feature
    </button>
  </div>
</div>

          {/* Tags */}
<div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">Tags</h2>
  <div className="space-y-4">
    {formData.tags.map((tag, index) => (
      <div key={index} className="flex items-center gap-4">
        <input
          type="text"
          value={tag}
          onChange={(e) => handleArrayChange(index, null, e.target.value, "tags")}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="e.g., eco-friendly"
        />
        {formData.tags.length > 1 && (
          <button
            type="button"
            onClick={() => removeArrayItem(index, "tags")}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={() => addArrayItem("tags", "")}
      className="flex items-center text-pink-600 hover:text-pink-700"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Tag
    </button>
  </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">Specifications</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Object.entries(formData.specifications).map(([key, value]) => (
      <div key={key}>
        <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
          {key}
        </label>
        <input
          type="text"
          name={key}
          value={value}
          onChange={(e) => handleSpecificationChange(key, e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder={`Enter ${key}`}
        />
      </div>
    ))}
  </div>
</div>



          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"  
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
