import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import appReducer from "./slices/app.slice";
import thumbnailReducer from "./slices/thumbnail.slice";
const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    thumbnail: thumbnailReducer,
  },
});

export default store;
