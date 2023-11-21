import { createSlice } from "@reduxjs/toolkit";

export interface AudioState {
  value: boolean;
}

const initialState: AudioState = {
  value: false,
};

export const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    audioPlayerOpen: (state: AudioState) => {
      state.value = true;
    },
    audioPlayerClose: (state: AudioState) => {
      state.value = false;
    },
  },
});

export const { audioPlayerOpen, audioPlayerClose } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;