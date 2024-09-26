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
  },
});

// Action creators are generated for each case reducer function
export const { addingToCart } = cartSlice.actions;

export default cartSlice.reducer;
