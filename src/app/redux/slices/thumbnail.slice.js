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
