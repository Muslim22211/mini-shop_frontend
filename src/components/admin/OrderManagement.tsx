import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../store/slices/ordersSlice";
import LoadingSpinner from "../common/LoadingSpinner";
import { type OrderStatus } from "../../types";

const OrderManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { allOrders, isLoading } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = (orderId: number, status: OrderStatus) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

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
      <div className="py-8">
        <LoadingSpinner size="lg" />
        <p className="text-center text-gray-600 mt-4">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {allOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500">
            Orders will appear here once customers start purchasing.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Order #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item(s)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.user?.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        User ID: {order.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <span className="mr-1">
                          {getStatusIcon(order.status)}
                        </span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                      <br />
                      <span className="text-xs">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Statistics */}
      {allOrders.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {allOrders.length}
            </div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border text-center">
            <div className="text-2xl font-bold text-green-600">
              {allOrders.filter((o) => o.status === "COMPLETED").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {allOrders.filter((o) => o.status === "PENDING").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border text-center">
            <div className="text-2xl font-bold text-red-600">
              {allOrders.filter((o) => o.status === "CANCELLED").length}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
