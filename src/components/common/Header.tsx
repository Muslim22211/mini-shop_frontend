import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { fetchCart } from "../../store/slices/cartSlice";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const cartItemsCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const isActiveLink = (path: string) => {
    return location.pathname === path
      ? "text-blue-300"
      : "text-white hover:text-blue-200";
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            🛍️ MiniShop
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/products"
              className={`transition ${isActiveLink("/products")}`}
            >
              Products
            </Link>

            {user ? (
              <>
                <Link
                  to="/cart"
                  className={`transition relative ${isActiveLink("/cart")}`}
                >
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/orders"
                  className={`transition ${isActiveLink("/orders")}`}
                >
                  Orders
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className={`transition ${isActiveLink("/admin")}`}
                  >
                    Admin
                  </Link>
                )}

                <div className="flex items-center space-x-4">
                  <span className="text-blue-100">Hello, {user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className={`transition ${isActiveLink("/login")}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`transition ${isActiveLink("/register")}`}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
