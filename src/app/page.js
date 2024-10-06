"use client";

import SideBar from "./components/sideBar/sideBar";
import HomePreview from "./components/previews/homePreview/homePreview";
import PreviewBar from "./components/previewBar/previewBar";
export default function Home() {
  return (
    <div className="relative p-4 flex w-full">
      <SideBar />
      <div className="flex w-full flex-col gap-4 pb-4 px-4">
        <div className="flex justify-end w-full ">
          <PreviewBar />
        </div>
        <div className="self-center max-w-screen-xl">
          <HomePreview
            initialRegionCode="DE"
            initialCategory=""
            initialLanguage="de"
          />
        </div>
      </div>
    </div>
  );
}
