import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import appReducer from "./slices/app.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
