import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isModalOpen: boolean;
  id: string;
}

const initialState: ModalState = {
  isModalOpen: false,
  id: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (
      state,
      action: PayloadAction<{ isModalOpen: boolean; id: string }>
    ) => {
      state.id = action.payload.id;
      state.isModalOpen = action.payload.isModalOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
