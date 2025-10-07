import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store";
import {
  setFilters,
  fetchProducts,
  fetchCategories,
} from "../../store/slices/productsSlice";

const ProductFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, categories } = useSelector(
    (state: RootState) => state.products
  );

  const [search, setSearch] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filterParams: any = {};
      if (search) filterParams.search = search;
      if (category) filterParams.category = category;
      if (minPrice) filterParams.minPrice = parseFloat(minPrice);
      if (maxPrice) filterParams.maxPrice = parseFloat(maxPrice);

      dispatch(setFilters(filterParams));
      dispatch(fetchProducts(filterParams));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, category, minPrice, maxPrice, dispatch]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasActiveFilters = search || category || minPrice || maxPrice;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Products</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔍 Search Products
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📂 Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💰 Min Price
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💵 Max Price
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {search && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Search: "{search}"
            </span>
          )}
          {category && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Category: {category}
            </span>
          )}
          {minPrice && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Min: ${minPrice}
            </span>
          )}
          {maxPrice && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Max: ${maxPrice}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
