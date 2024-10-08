import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  currentPreview: 0,
  previews: [],
  comparisonList: ["trending"],
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
    setComparisonList(state, action) {
      state.comparisonList.push(action.payload);
    },
    removeComparisonList(state, action) {
      if (state.comparisonList.length > 1) {
        state.comparisonList = state.comparisonList.filter(
          (item, index) => index === 0 || item !== action.payload
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
  setComparisonList,
  removeComparisonList,
  setChannelAvatar,
} = appSlice.actions;
export default appSlice.reducer;
