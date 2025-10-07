import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "../store";
import AdminPanel from "../components/admin/AdminPanel";

const Admin: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Redirect if not admin
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <AdminPanel />
    </div>
  );
};

export default Admin;
