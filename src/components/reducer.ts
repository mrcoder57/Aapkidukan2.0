import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        if (itemToRemove.qty === 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        } else {
          itemToRemove.qty -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalPrice = createSelector(
  [selectCartItems],
  (items: CartItem[]) => items.reduce((total, item) => total + item.price * item.qty, 0)
);
