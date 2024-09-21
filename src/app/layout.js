"use client";
import "./globals.css";
import ThemeWrapper from "./components/themeWrapper/themeWrapper";
import { Provider } from "react-redux";
import store from "./redux/store";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </Provider>
    </html>
  );
}
