import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumbnailFiles: [],
  thumbnailPreviews: [],
  isLoading: false,
  selectedThumbnail: 0,
  channelAvatars: {},
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
    setChannelAvatar: (state, action) => {
      state.channelAvatars[action.payload.channelId] = action.payload.avatarUrl;
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
} = thumbnailSlice.actions;

export default thumbnailSlice.reducer;
