"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchList,
  setSelectedSearchItem,
} from "@/app/redux/slices/app.slice";
import ProjectList from "@/app/components/studio/projectList";
import UserDetails from "@/app/components/studio/userDetails/userDetails";
import Navigation from "@/app/components/studio/navigation/navigation";

export default function StudioClient({ session, trendingData }) {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.app.searchList);

  useEffect(() => {
    if (trendingData && searchList.length === 0) {
      dispatch(setSearchList({ query: "trending", results: trendingData }));
      dispatch(setSelectedSearchItem("trending"));
    }
  }, [trendingData, dispatch, searchList]);

  return (
    <div className="flex flex-col max-w-7xl py-32 h-screen mx-auto">
      <UserDetails session={session} />
      <Navigation />
      <ProjectList session={session} />
    </div>
  );
}
