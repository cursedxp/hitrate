"use client";
import Button from "../button/button";
import ThemeToggle from "../themeToggle/themeToggle";
import ShuffleButton from "../shuffleButton/shuffleButton";
import { Menu } from "react-feather";
import TabBar from "./tabBar/tabBar";
import Thumbnails from "./thumbnails/thumbnails";
import TitleManager from "../titleManager/titleManager";
import UserDetails from "./userDetails/userDetails";
import { useSelector } from "react-redux";

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
  const projectName = useSelector((state) => state.app.projectName);
  return (
    <div className={`bg-white shadow-xl dark:bg-zinc-800 rounded-xl w-[300px]`}>
      <UserDetails />
      <div className="flex gap-2 px-2 py-2 items-center border-b border-zinc-100 dark:border-zinc-700">
        <Button className="bg-white">
          <Menu className="w-4 h-4 dark:text-white" />
        </Button>
        <span className="text-sm font-bold">{projectName}</span>
        <div className="flex gap-2 justify-end flex-1">
          <ThemeToggle />
          <ShuffleButton />
        </div>
      </div>
      <TabBar tabs={tabs} />
    </div>
  );
}
