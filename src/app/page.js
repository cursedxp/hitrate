"use client";

import SideBar from "./components/sideBar/sideBar";
import Videos from "./components/videos/videos";
export default function Home() {
  return (
    <div className="relative p-4 flex">
      <SideBar />
      <Videos initialRegionCode="DE" initialCategory="" initialLanguage="de" />
    </div>
  );
}
