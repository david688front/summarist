import { configureStore } from "@reduxjs/toolkit";
import audioPlayerSlice from "./player";
import modalSlice from "./modalSlice";
import sideBarSlice from "./sidebar";
import fontSizeSlice from "./font";

export const modalStore = configureStore({
  reducer: {
    modal: modalSlice,
    audioPlayer: audioPlayerSlice,
    sideBar: sideBarSlice,
    fontSize: fontSizeSlice,
  },
});

export type RootState = ReturnType<typeof modalStore.getState>;
export type AppDispatch = typeof modalStore.dispatch;
