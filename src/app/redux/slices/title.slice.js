import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  titles: [],
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
  },
});

export const { setTitle, setTitles } = titleSlice.actions;
export default titleSlice.reducer;
