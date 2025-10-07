import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";
import CartItem from "./CartItem";
import LoadingSpinner from "../common/LoadingSpinner";

const Cart: React.FC = () => {
  const { cart, isLoading } = useSelector((state: RootState) => state.cart);

  if (isLoading) {
    return (
      <div className="py-8">
        <LoadingSpinner size="lg" />
        <p className="text-center text-gray-600 mt-4">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some amazing products to your cart to see them here!
          </p>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md border">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <p className="text-gray-600 mt-1">
          {cart.items.length} item(s) in cart
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-900">Total:</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
