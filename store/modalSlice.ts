import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  value: boolean;
}

const initialState: ModalState = {
  value: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state: ModalState) => {
      state.value = true;
    },
    modalClose: (state: ModalState) => {
      state.value = false;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;