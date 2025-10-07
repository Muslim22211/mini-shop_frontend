import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import { fetchUserOrders } from "../store/slices/ordersSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { type OrderStatus } from "../types";

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "⏳";
      case "PROCESSING":
        return "🔄";
      case "COMPLETED":
        return "✅";
      case "CANCELLED":
        return "❌";
      default:
        return "📦";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" />
          <p className="text-center text-gray-600 mt-4">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
              >
                Start Shopping
              </a>
              <a
                href="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition duration-300"
              >
                Back to Home
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md border overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="mt-4 lg:mt-0 text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <span className="mr-1">
                          {getStatusIcon(order.status)}
                        </span>
                        {order.status}
                      </span>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Order Items:
                  </h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b last:border-b-0"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <img
                            src={item.product.image || "/placeholder-image.jpg"}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {item.product.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {item.product.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${(item.price * item.quantity).toFixed(2)} total
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Statistics */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md border text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.length}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter((o) => o.status === "COMPLETED").length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter((o) => o.status === "PENDING").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border text-center">
              <div className="text-2xl font-bold text-purple-600">
                $
                {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
