"use client";
import "./globals.css";
import ThemeProvider from "./components/themeProvider/themeProvider";
import NextAuthSessionProvider from "./components/sessionProvider/sessionProvider";
import StoreProvider from "./redux/storeProvider";
export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <NextAuthSessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NextAuthSessionProvider>
    </StoreProvider>
  );
}
