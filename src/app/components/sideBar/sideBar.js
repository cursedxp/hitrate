"use client";
import Button from "../button/button";
import ThemeToggle from "../themeToggle/themeToggle";
import ShuffleButton from "../shuffleButton/shuffleButton";
import { Menu } from "react-feather";
import TabBar from "./tabBar/tabBar";
import Thumbnails from "./thumbnails/thumbnails";
import TitleManager from "../titleManager/titleManager";
const tabs = [
  {
    name: "Images",
    content: <Thumbnails />,
  },
  {
    name: "Titles",
    content: <TitleManager />,
  },
];

export default function SideBar() {
  return (
    <div className="bg-white shadow-md dark:bg-zinc-800 rounded-xl w-[300px] h-screen overflow-scroll">
      <div className="flex gap-2 px-2 py-2 items-center border-b border-zinc-200 dark:border-zinc-700">
        <Button className="bg-white">
          <Menu className="w-4 h-4 dark:text-white" />
        </Button>
        <span className="text-sm font-bold">ProjectName</span>
        <div className="flex gap-2 justify-end flex-1">
          <ThemeToggle />
          <ShuffleButton />
        </div>
      </div>
      <TabBar tabs={tabs} />
    </div>
  );
}
