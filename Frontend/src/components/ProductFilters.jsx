import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProductFilters({ filters, setFilters }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    size: true,
    color: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (section, value) => {
    setFilters((prev) => {
      const isSelected = prev[section]?.includes(value);
      return {
        ...prev,
        [section]: isSelected
          ? prev[section].filter((item) => item !== value)
          : [...(prev[section] || []), value],
      };
    });
  };

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
      >
        {title}
        {expandedSections[sectionKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg mb-4">Filters</h3>

      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-2">
          {["T-Shirts", "Shirts", "Jeans", "Dresses", "Jackets", "Shoes"].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCheckboxChange("category", category)}
                className="mr-2 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand" sectionKey="brand">
        <div className="space-y-2">
          {["Nike", "Adidas", "Zara", "H&M", "Levi's", "Puma"].map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleCheckboxChange("brand", brand)}
                className="mr-2 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size" sectionKey="size">
        <div className="grid grid-cols-3 gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="flex items-center justify-center border border-gray-300 rounded p-2 cursor-pointer hover:border-pink-500">
              <input
                type="checkbox"
                checked={filters.size.includes(size)}
                onChange={() => handleCheckboxChange("size", size)}
                className="sr-only"
              />
              <span className="text-sm text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* <FilterSection title="Color" sectionKey="color">
        <div className="flex flex-wrap gap-2">
          {["#000000", "#FFFFFF", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB", "#A52A2A", "#FF0000", "#008000"].map((color) => (
            <label key={color} className="cursor-pointer">
              <input
                type="checkbox"
                checked={filters.color.includes(color)}
                onChange={() => handleCheckboxChange("color", color)}
                className="sr-only"
              />
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-pink-500"
                style={{ backgroundColor: color }}
              />
            </label>
          ))}
        </div>
      </FilterSection> */}

      {/* <FilterSection title="Customer Rating" sectionKey="rating">
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.rating.includes(rating)}
                onChange={() => handleCheckboxChange("rating", rating)}
                className="mr-2 text-pink-600 focus:ring-pink-500"
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                ))}
                <span className="text-sm text-gray-600 ml-1">& above</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection> */}
    </div>
  );
}
