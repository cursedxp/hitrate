"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjectName } from "@/app/redux/slices/app.slice";
import Button from "../button/button";
import ThemeToggle from "../themeToggle/themeToggle";
import ShuffleButton from "../shuffleButton/shuffleButton";
import { Menu } from "react-feather";
import TabBar from "./tabBar/tabBar";
import Thumbnails from "./thumbnails/thumbnails";
import TitleManager from "../titleManager/titleManager";
import UserDetails from "./userDetails/userDetails";
import { useParams } from "next/navigation";

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
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const projectName = useSelector((state) => state.app.projectName);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName);

  const handleProjectNameClick = () => {
    setIsEditing(true);
    setEditedName(projectName);
  };

  const handleProjectNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleProjectNameSave = async () => {
    if (editedName.trim() !== "") {
      dispatch(setProjectName(editedName));
      setIsEditing(false);

      try {
        const response = await fetch(`/api/projects/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            updates: { name: editedName },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update project name");
        }
      } catch (error) {
        console.error("Error updating project name:", error);
        // Optionally, you can show an error message to the user here
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleProjectNameSave();
    }
  };

  return (
    <div
      className={`bg-white shadow-xl dark:bg-zinc-800 rounded-xl w-[300px] flex-shrink-0`}
    >
      <UserDetails />
      <div className="flex gap-2 px-2 py-2 items-center border-b border-zinc-100 dark:border-zinc-700">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleProjectNameChange}
            onBlur={handleProjectNameSave}
            onKeyDown={handleKeyDown}
            className="w-full text-sm font-bold bg-transparent border-none outline-none"
            autoFocus
          />
        ) : (
          <div
            className="text-sm ml-2 font-bold cursor-pointer"
            onClick={handleProjectNameClick}
          >
            {projectName}
          </div>
        )}
        <div className="flex gap-2 justify-end flex-1">
          <ThemeToggle />
          <ShuffleButton />
        </div>
      </div>
      <TabBar tabs={tabs} />
    </div>
  );
}
