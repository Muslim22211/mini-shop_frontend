import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store";
import { addToCart } from "../../store/slices/cartSlice";
import { type Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder-image.jpg"}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="text-xs text-gray-500">
            Added {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!user}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span>🛒</span>
          <span>{user ? "Add to Cart" : "Login to Buy"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
