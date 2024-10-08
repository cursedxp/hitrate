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
      state.thumbnailFiles = Array.isArray(action.payload)
        ? [...state.thumbnailFiles, ...action.payload]
        : Array.isArray(action.payload)
        ? [action.payload]
        : [];
    },
    setThumbnailPreviews: (state, action) => {
      state.thumbnailPreviews = Array.isArray(action.payload)
        ? [...state.thumbnailPreviews, ...action.payload]
        : Array.isArray(action.payload)
        ? [action.payload]
        : [];
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
  setIsLoading,
  setSelectedThumbnail,
  setChannelAvatar,
} = thumbnailSlice.actions;

export default thumbnailSlice.reducer;
