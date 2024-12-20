import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: [""],
  selectedTitle: "Untitled Video",
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    addTitle: (state, action) => {
      if (action.payload) {
        state.titles.push(action.payload);
      } else {
        state.titles.push("");
      }
    },
    updateTitle: (state, action) => {
      const { index, value } = action.payload;
      state.titles[index] = value;
    },
    removeTitle: (state, action) => {
      state.titles.splice(action.payload, 1);
    },
    reorderTitles: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [reorderedItem] = state.titles.splice(oldIndex, 1);
      state.titles.splice(newIndex, 0, reorderedItem);
    },
    setSelectedTitle: (state, action) => {
      state.selectedTitle = action.payload;
    },
    clearTitleData: (state) => {
      state.titles = [""];
      state.selectedTitle = "";
    },
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
  },
});

export const {
  addTitle,
  updateTitle,
  removeTitle,
  reorderTitles,
  setSelectedTitle,
  clearTitleData,
  setTitles,
} = titleSlice.actions;
export default titleSlice.reducer;
