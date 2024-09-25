import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumbnailFiles: [],
  thumbnailPreviews: [],
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
  },
});

export const { setThumbnailFiles, setThumbnailPreviews } =
  thumbnailSlice.actions;
export default thumbnailSlice.reducer;
