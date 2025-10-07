import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import type { Cart, CartItem } from "../../types";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Cart>("/cart");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity }: { productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<CartItem>("/cart/add", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { itemId, quantity }: { itemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put<CartItem>(`/cart/item/${itemId}`, {
        quantity,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/item/${itemId}`);
      return itemId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (state.cart) {
          const existingItem = state.cart.items.find(
            (item) => item.id === action.payload.id
          );
          if (existingItem) {
            existingItem.quantity = action.payload.quantity;
          } else {
            state.cart.items.push(action.payload);
          }
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          const itemIndex = state.cart.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (itemIndex !== -1) {
            if (action.payload.quantity <= 0) {
              state.cart.items.splice(itemIndex, 1);
            } else {
              state.cart.items[itemIndex] = action.payload;
            }
          }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.items = state.cart.items.filter(
            (item) => item.id !== action.payload
          );
        }
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
