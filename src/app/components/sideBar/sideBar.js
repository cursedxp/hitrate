"use client";
import Button from "../button/button";
import SideBarContent from "./sideBarContent";
import ThemeToggle from "../themeToggle/themeToggle";
import ShuffleButton from "../shuffleButton/shuffleButton";
import { Menu } from "react-feather";

export default function SideBar() {
  return (
    <div className="absolute top-5 left-5 z-10 bg-white shadow-md dark:bg-zinc-900 rounded-xl w-[300px]">
      <div className="flex gap-2 px-2 py-2 items-center border-b border-zinc-200 dark:border-zinc-800">
        <Button className="bg-white">
          <Menu className="w-4 h-4 dark:text-white" />
        </Button>
        <span className="text-sm font-bold">ProjectName</span>
        <div className="flex gap-2 justify-end flex-1">
          <ThemeToggle />
          <ShuffleButton />
        </div>
      </div>
      <SideBarContent />
    </div>
  );
}
