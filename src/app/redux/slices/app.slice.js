import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  currentPreview: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setCurrentPreview(state, action) {
      state.currentPreview = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
