import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  currentPreview: 0,
  //rename this later to uploadedPreviews
  previews: [],
  searchList: [],
  selectedSearchItem: "",
  channelAvatars: {},
  channelHandle: "",
  //rename this later to mergedPreviews
  allPreviews: [],
  projectName: "Untitled",
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
    setPreviews(state, action) {
      state.previews = action.payload;
    },
    addPreviews(state, action) {
      state.previews = [...state.previews, ...action.payload];
    },
    removePreview(state, action) {
      const index = action.payload;
      state.previews = state.previews.filter((_, i) => i !== index);
    },
    setSearchList(state, action) {
      const newSearch = action.payload;
      const existingIndex = state.searchList.findIndex(
        (item) => item.query === newSearch.query
      );

      if (existingIndex === -1) {
        // Add new search only if it doesn't exist
        state.searchList.push(newSearch);
      }
      // If it exists, do nothing
    },
    removeSearchList(state, action) {
      const queryToRemove = action.payload;
      if (state.searchList.length > 1 && queryToRemove !== "trending") {
        state.searchList = state.searchList.filter(
          (item) => item.query !== queryToRemove
        );
      }
    },
    setSelectedSearchItem(state, action) {
      state.selectedSearchItem = action.payload;
    },
    setChannelAvatars: (state, action) => {
      state.channelAvatars = { ...state.channelAvatars, ...action.payload };
    },
    setAllPreviews: (state, action) => {
      state.allPreviews = action.payload;
    },
    setChannelHandle: (state, action) => {
      state.channelHandle = action.payload;
    },
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
  },
});

export const {
  setTheme,
  setCurrentPreview,
  setPreviews,
  addPreviews,
  setSearchList,
  removeSearchList,
  setChannelAvatars,
  removePreview,
  setSelectedSearchItem,
  setAllPreviews,
  setChannelHandle,
  setProjectName,
} = appSlice.actions;
export default appSlice.reducer;
