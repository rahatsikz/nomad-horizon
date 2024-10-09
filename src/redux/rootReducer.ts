import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slice/cart/cartSlice";
import userReducer from "./slice/user/userSlice";
import { baseApi } from "./api/baseApi";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
