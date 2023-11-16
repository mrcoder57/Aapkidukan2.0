import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
type CartProps = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  Propss: CartProps[];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { Propss: [] } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProps>) => {
      const existingProps = state.Propss.find(Props => Props.id === action.payload.id);
      if (existingProps) {
        existingProps.qty += 1;
      } else {
        state.Propss.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const PropsToRemove = state.Propss.find(Props => Props.id === action.payload);
      if (PropsToRemove) {
        if (PropsToRemove.qty === 1) {
          state.Propss = state.Propss.filter(Props => Props.id !== action.payload);
        } else {
          PropsToRemove.qty -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartPropss = (state: RootState) => state.cart.Propss;

export const selectTotalPrice = createSelector(
  [selectCartPropss],
  (Propss: CartProps[]) => Propss.reduce((total, Props) => total + Props.price * Props.qty, 0)
);
