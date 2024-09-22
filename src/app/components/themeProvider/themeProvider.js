"use client";

import { useSelector } from "react-redux";
import Header from "../header/header";
export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.app.theme);
  return (
    <html lang="en" className={theme}>
      <body className="bg-white dark:bg-black dark:text-white h-screen">
        {/* <Header /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
