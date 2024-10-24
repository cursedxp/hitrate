import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumbnailFiles: [],
  thumbnailPreviews: [],
  isLoading: false,
  selectedThumbnail: 0,
  hiddenThumbnails: [], // Add this line
};

const thumbnailSlice = createSlice({
  name: "thumbnail",
  initialState,
  reducers: {
    setThumbnailFiles: (state, action) => {
      state.thumbnailFiles = action.payload;
    },
    setThumbnailPreviews: (state, action) => {
      state.thumbnailPreviews = action.payload;
    },
    addThumbnailFiles: (state, action) => {
      state.thumbnailFiles = [...state.thumbnailFiles, ...action.payload];
    },
    addThumbnailPreviews: (state, action) => {
      state.thumbnailPreviews = [...state.thumbnailPreviews, ...action.payload];
    },
    removeThumbnail: (state, action) => {
      const index = action.payload;
      state.thumbnailFiles = state.thumbnailFiles.filter((_, i) => i !== index);
      state.thumbnailPreviews = state.thumbnailPreviews.filter(
        (_, i) => i !== index
      );
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedThumbnail: (state, action) => {
      state.selectedThumbnail = action.payload;
    },
    clearThumbnailData: (state) => {
      state.thumbnailFiles = [];
      state.thumbnailPreviews = [];
      state.isLoading = false;
      state.selectedThumbnail = 0;
    },
    toggleHiddenThumbnail: (state, action) => {
      const thumbnailUrl = action.payload;
      const index = state.hiddenThumbnails.indexOf(thumbnailUrl);
      if (index === -1) {
        state.hiddenThumbnails.push(thumbnailUrl);
      } else {
        state.hiddenThumbnails.splice(index, 1);
      }
    },
  },
});

export const {
  setThumbnailFiles,
  setThumbnailPreviews,
  addThumbnailFiles,
  addThumbnailPreviews,
  removeThumbnail,
  setIsLoading,
  setSelectedThumbnail,
  setChannelAvatar,
  clearThumbnailData,
  toggleHiddenThumbnail,
} = thumbnailSlice.actions;

export default thumbnailSlice.reducer;
