import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductFilters from "../components/products/ProductFilters";
import ProductList from "../components/products/ProductList";
import { fetchProducts, fetchCategories } from "../store/slices/productsSlice";

const Products: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of quality products at
            great prices
          </p>
        </div>

        <ProductFilters />
        <ProductList />
      </div>
    </div>
  );
};

export default Products;
