import { createSlice } from "@reduxjs/toolkit";

export interface FontSizeState {
  value: string;
}

const initialState: FontSizeState = {
  value: "16px",
};

export const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    fontSizeSmall: (state: FontSizeState) => {
      state.value = "16px";
    },
    fontSizeMedium: (state: FontSizeState) => {
      state.value = "18px";
    },
    fontSizeLarge: (state: FontSizeState) => {
      state.value = "22px";
    },
    fontSizeXLarge: (state: FontSizeState) => {
      state.value = "26px";
    },
  },
});

export const { fontSizeSmall, fontSizeMedium, fontSizeLarge, fontSizeXLarge } =
  fontSizeSlice.actions;

export default fontSizeSlice.reducer;