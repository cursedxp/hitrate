import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: [],
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    addTitle: (state) => {
      state.titles.push("");
    },
    updateTitle: (state, action) => {
      const { index, value } = action.payload;
      state.titles[index] = value;
    },
    removeTitle: (state, action) => {
      state.titles.splice(action.payload, 1);
    },
  },
});

export const { addTitle, updateTitle, removeTitle } = titleSlice.actions;
export default titleSlice.reducer;
