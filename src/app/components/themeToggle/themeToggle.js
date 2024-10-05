"use client";

import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun } from "react-feather";
import Button from "../button/button";
import { setTheme } from "@/app/redux/slices/app.slice";

export default function ThemeToggle() {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <Button onClick={handleThemeChange}>
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 text-black" />
      )}
    </Button>
  );
}
