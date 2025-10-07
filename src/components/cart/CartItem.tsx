import React from "react";
import { useDispatch } from "react-redux";
import { type CartItem as CartItemType } from "../../types";
import { updateCartItem, removeFromCart } from "../../store/slices/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateCartItem({ itemId: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      <img
        src={item.product.image || "/placeholder-image.jpg"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg border"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
        }}
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">${item.product.price}</p>
        <p className="text-xs text-gray-500 mt-1">{item.product.category}</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            −
          </button>

          <span className="w-12 text-center font-medium">{item.quantity}</span>

          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>

        <div className="text-right min-w-[100px]">
          <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 text-sm mt-1 transition flex items-center space-x-1"
          >
            <span>🗑️</span>
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
