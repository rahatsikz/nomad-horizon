import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart: {
    user: string;
    service: string;
  }[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addingToCart: (
      state,
      action: PayloadAction<{ user: string; service: string }>
    ) => {
      state.cart = state.cart.concat(action.payload);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        user: string;
        service: string;
      }>
    ) => {
      // state.cart = state.cart.filter((item) => item !== action.payload);
      const index = state.cart.findIndex(
        (item) =>
          item.user === action.payload.user &&
          item.service === action.payload.service
      );
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },

    editCart: (
      state,
      action: PayloadAction<{ user: string; service: string }>
    ) => {
      const noUser = state.cart.filter((item) => !item.user);
      const lastData = noUser[noUser.length - 1];
      if (lastData) {
        lastData.user = action.payload.user;
        lastData.service = action.payload.service;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addingToCart, removeFromCart, clearCart, editCart } =
  cartSlice.actions;

export default cartSlice.reducer;
