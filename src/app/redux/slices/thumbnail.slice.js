import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumbnailFiles: [],
  thumbnailPreviews: [],
  isLoading: false,
  selectedThumbnail: 0,
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedThumbnail: (state, action) => {
      state.selectedThumbnail = action.payload;
    },
  },
});

export const {
  setThumbnailFiles,
  setThumbnailPreviews,
  setIsLoading,
  setSelectedThumbnail,
} = thumbnailSlice.actions;
export default thumbnailSlice.reducer;
