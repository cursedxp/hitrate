import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  currentPreview: 0,
  previews: [],
  searchList: [],
  channelAvatars: {},
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
    setChannelAvatar: (state, action) => {
      state.channelAvatars[action.payload.channelId] = action.payload.avatarUrl;
    },
  },
});

export const {
  setTheme,
  setCurrentPreview,
  setPreviews,
  setSearchList,
  removeSearchList,
  setChannelAvatar,
} = appSlice.actions;
export default appSlice.reducer;
