import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart: string[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addingToCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.concat(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // state.cart = state.cart.filter((item) => item !== action.payload);
      const index = state.cart.indexOf(action.payload);
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addingToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
