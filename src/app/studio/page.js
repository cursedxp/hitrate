"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Plus, ChevronDown, CreditCard, LogOut } from "react-feather";
import { signOut } from "next-auth/react";
import { clearProjectData } from "@/app/redux/slices/app.slice";
import { clearThumbnailData } from "@/app/redux/slices/thumbnail.slice";
import { clearTitleData } from "@/app/redux/slices/title.slice";
import { useDispatch } from "react-redux";
import ProjectList from "@/app/components/studio/projectList";
export default function Dashboard() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("Projects");
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const resetReduxStates = () => {
    dispatch(clearProjectData());
    dispatch(clearThumbnailData());
    dispatch(clearTitleData());
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (session) {
      resetReduxStates();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [session]);

  const getUserBadge = () => {
    const status = session?.user?.subscriptionStatus;
    if (status === "active") {
      return (
        <div className="flex h-6 items-center justify-center text-xs text-center bg-green-100 text-green-500 font-medium rounded-md px-2">
          Pro
        </div>
      );
    }
    return null;
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error redirecting to customer portal:", error);
      // You might want to add a toast notification here
    }
  };

  // Add this helper function near other helper functions

  return (
    <div className="flex flex-col max-w-7xl py-32 h-screen mx-auto">
      <div className="flex relative items-center justify-center space-x-4 ">
        <div className="w-22 rounded-full p-1 bg-gradient-to-br from-pink-500 via-blue-500 animate-gradient-x">
          <Image
            src={session?.user?.image}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className="relative flex flex-col" ref={dropdownRef}>
          <div className="flex items-center">
            <div className="text-xl font-semibold">{session?.user?.name}</div>
            {getUserBadge()}
            <div
              className="flex w-6 h-6 items-center justify-center hover:cursor-pointer hover:bg-zinc-100 rounded-md"
              onClick={handleDropdown}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-zinc-400 text-sm">{session?.user?.email}</div>
          {isDropdownOpen && (
            <div className="absolute top-8 -left-7 w-[200px] bg-white shadow-md rounded-2xl">
              <ul className="flex flex-col gap-1">
                <li
                  className="text-sm flex items-center gap-2 hover:cursor-pointer hover:bg-zinc-100 rounded-md px-2 py-2"
                  onClick={handleManageSubscription}
                >
                  <CreditCard className="w-4 h-4" /> Manage Subscription
                </li>
                <li
                  className="text-sm flex items-center gap-2 hover:cursor-pointer hover:bg-zinc-100 rounded-md px-2 py-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <nav className="flex justify-center mt-8">
        <ul className="flex mt-4 space-x-4">
          {["Projects"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`bg-zinc-100 px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-zinc-200 ${
                  isActive === item ? "bg-zinc-200" : ""
                }`}
                onClick={() => setIsActive(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ProjectList />
    </div>
  );
}
