import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";

const ProductList: React.FC = () => {
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
        <p className="text-center text-gray-600 mt-4">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl mr-2">❌</span>
            <h3 className="text-lg font-semibold">Error Loading Products</h3>
          </div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-8 rounded-lg max-w-md mx-auto">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
          <p>
            Try adjusting your search filters or check back later for new
            products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
