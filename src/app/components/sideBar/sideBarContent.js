"use client";
import Thumbnails from "./thumbnails/thumbnails";
import { useSelector } from "react-redux";

export default function SideBarContent() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );

  return (
    <div className="flex flex-col p-2">
      <Thumbnails />
    </div>
  );
}
