"use client";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.app.theme);
  return (
    <html lang="en" className={theme}>
      <body className="bg-white dark:bg-zinc-900 dark:text-white h-screen">
        <Toaster position="top-right" />
        <main>{children}</main>
      </body>
    </html>
  );
}
