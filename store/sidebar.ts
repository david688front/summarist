import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  value: boolean;
}

const initialState: SidebarState = {
  value: false,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    sideBarOpen: (state: SidebarState) => {
      state.value = true;
    },
    sideBarClose: (state: SidebarState) => {
      state.value = false;
    },
  },
});

export const { sideBarOpen, sideBarClose } = sideBarSlice.actions;

export default sideBarSlice.reducer;
