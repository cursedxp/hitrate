"use client";
import "./globals.css";
import ThemeProvider from "./components/themeProvider/themeProvider";
import StoreProvider from "./redux/storeProvider";
import { useSelector } from "react-redux";
export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}
