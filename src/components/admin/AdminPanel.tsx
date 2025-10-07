import React, { useState } from "react";
import ProductForm from "./ProductForm";
import OrderManagement from "./OrderManagement";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-100 mt-2">
            Manage your store's products and orders
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">📦</span>
                <span>Product Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition ${
                activeTab === "orders"
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">📋</span>
                <span>Order Management</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "products" && <ProductForm />}
          {activeTab === "orders" && <OrderManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
