"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchList,
  setSelectedSearchItem,
} from "@/app/redux/slices/app.slice";

export default function InitialDataProvider({ trendingData, children }) {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.app.searchList);

  useEffect(() => {
    if (trendingData && searchList.length === 0) {
      dispatch(setSearchList({ query: "trending", results: trendingData }));
      dispatch(setSelectedSearchItem("trending"));
    }
  }, [trendingData, dispatch, searchList]);

  return children;
}
