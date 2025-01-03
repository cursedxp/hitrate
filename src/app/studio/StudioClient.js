"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchList,
  setSelectedSearchItem,
} from "@/app/redux/slices/app.slice";
import ProjectList from "@/app/components/studio/projectList/projectList";
import UserDetails from "@/app/components/studio/userDetails/userDetails";
import Navigation from "@/app/components/studio/navigation/navigation";
import CollectionList from "@/app/components/studio/collectionList/collectionList";

export default function StudioClient({ session, trendingData }) {
  const [isActive, setIsActive] = useState("Projects");
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.app.searchList);

  useEffect(() => {
    if (trendingData && searchList.length === 0) {
      dispatch(setSearchList({ query: "trending", results: trendingData }));
      dispatch(setSelectedSearchItem("trending"));
    }
  }, [trendingData, dispatch, searchList]);

  const handleTabChange = (tab) => {
    setIsActive(tab);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col max-w-7xl py-32 h-screen mx-auto">
      <UserDetails session={session} />
      <Navigation isActive={isActive} setIsActive={handleTabChange} />
      {isActive === "Projects" ? (
        <ProjectList key={`projects-${key}`} session={session} />
      ) : (
        <CollectionList key={`collections-${key}`} session={session} />
      )}
    </div>
  );
}
