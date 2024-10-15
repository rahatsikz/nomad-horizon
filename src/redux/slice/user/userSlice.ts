import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    // username: string | null;
    accessToken: string | null;
    seenNotifications: number[];
  };
}

const initialState: UserState = {
  user: {
    // username: null,
    accessToken: null,
    seenNotifications: [],
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

    setNotifications: (state, action: PayloadAction<number>) => {
      // console.log(state.user.notifications);

      state.user.seenNotifications = state.user.seenNotifications?.concat(
        action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, removeAccessToken, setNotifications } =
  userSlice.actions;

export default userSlice.reducer;
