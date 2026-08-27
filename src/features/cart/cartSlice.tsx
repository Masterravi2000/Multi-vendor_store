import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';

interface CartState {
  items: CartItem[];
  isLoaded: boolean; // Tracks if IndexedDB has finished loading
}

const initialState: CartState = {
  items: [],
  isLoaded: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    updateQuantity: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === product.id);

      if (quantity === 0) {
        if (existingIndex >= 0) state.items.splice(existingIndex, 1);
      } else if (existingIndex >= 0) {
        state.items[existingIndex].quantity = quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
  },
});

export const { setCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;