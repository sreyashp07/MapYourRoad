import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  appReady: boolean;
}

const initialState: UiState = {
  appReady: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAppReady(state, action: PayloadAction<boolean>) {
      state.appReady = action.payload;
    },
  },
});

export const { setAppReady } = uiSlice.actions;
export default uiSlice.reducer;
