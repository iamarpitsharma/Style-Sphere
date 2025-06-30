import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import { Filter, Grid, List } from "lucide-react";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: [],
    size: [],
    color: [],
    rating: [],
  });

  const location = useLocation();

  useEffect(() => {
    // Get category from URL path
    const pathname = location.pathname;
    let category = "";
    
    if (pathname === "/men") category = "men";
    else if (pathname === "/women") category = "women";
    else if (pathname === "/kids") category = "kids";
    else if (pathname === "/accessories") category = "accessories";
    else if (pathname === "/brands") category = "brands";
    else if (pathname === "/sale") category = "sale";
    
    // Also check URL search params for category
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get("category");
    if (urlCategory) {
      category = urlCategory;
    }
    
    setSelectedCategory(category);
  }, [location.pathname, location.search]);

  const getCategoryTitle = () => {
    if (!selectedCategory) return "All Products";
    const categoryTitles = {
      men: "Men's Fashion",
      women: "Women's Fashion",
      kids: "Kids Collection",
      accessories: "Accessories",
      brands: "All Brands",
      sale: "Sale Items",
    };
    return categoryTitles[selectedCategory] || "All Products";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-gray-600 mb-6">
          <span>Home</span> / <span>Products</span>
          {selectedCategory && (
            <span>
              {" "}/ <span className="capitalize">{selectedCategory}</span>
            </span>
          )}
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{getCategoryTitle()}</h1>
            <p className="text-gray-600">Showing 1-24 of 1,234 products</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Customer Rating</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-pink-600 text-white" : "text-gray-600"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-pink-600 text-white" : "text-gray-600"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          <div className="flex-1">
            <ProductGrid 
              viewMode={viewMode} 
              sortBy={sortBy} 
              filters={filters} 
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
