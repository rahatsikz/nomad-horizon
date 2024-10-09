import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    // username: string | null;
    accessToken: string | null;
  };
}

const initialState: UserState = {
  user: {
    // username: null,
    accessToken: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.user.accessToken = action.payload;
    },
    removeAccessToken: (state) => {
      state.user.accessToken = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, removeAccessToken } = userSlice.actions;

export default userSlice.reducer;
