import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import appReducer from "./slices/app.slice";
import thumbnailReducer from "./slices/thumbnail.slice";
import titleReducer from "./slices/title.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    thumbnail: thumbnailReducer,
    title: titleReducer,
  },
});

export default store;
