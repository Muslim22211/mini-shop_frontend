import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { type RootState } from "../store";
import { fetchCart } from "../store/slices/cartSlice";
import { createOrder } from "../store/slices/ordersSlice";
import CartComponent from "../components/cart/Cart";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoading: cartLoading } = useSelector(
    (state: RootState) => state.cart
  );
  const { isLoading: isCreatingOrder } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = async () => {
    try {
      await dispatch(createOrder()).unwrap();
      navigate("/orders");
    } catch (error: any) {
      alert(error || "Failed to create order. Please try again.");
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" />
          <p className="text-center text-gray-600 mt-4">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-md p-12 max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover amazing products!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
              >
                Browse Products
              </Link>
              <Link
                to="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartComponent />
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md border h-fit sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Items ({cart.items.length})
                </span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCreatingOrder}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-semibold text-lg flex items-center justify-center space-x-2"
            >
              {isCreatingOrder ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🛒</span>
                  <span>Proceed to Checkout</span>
                </>
              )}
            </button>

            <Link
              to="/products"
              className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-medium"
            >
              ← Continue Shopping
            </Link>

            {/* Security Badge */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secure checkout guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
