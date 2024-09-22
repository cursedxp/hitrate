"use client";

import Button from "../button/button";
import { Sidebar, Menu } from "react-feather";
import SideBarContent from "./sideBarContent";
import { useState } from "react";
import ThemeToggle from "../themeToggle/themeToggle";
import ShuffleButton from "../shuffleButton/shuffleButton";

export default function SideBar() {
  return (
    <div className="absolute top-5 left-5 z-10 bg-white shadow-md dark:bg-zinc-900 rounded-xl">
      <div className="flex gap-2 p-4 items-center">
        <Button className="bg-white">
          <Menu className="w-4 h-4 dark:text-white" />
        </Button>
        <span className="text-sm font-bold">ProjectName</span>
        <ThemeToggle />
        <ShuffleButton />
      </div>
      <SideBarContent />
    </div>
  );
}
