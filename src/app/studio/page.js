"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Plus, ChevronDown, CreditCard, LogOut } from "react-feather";
import ProjectItem from "../components/dashboard/projectItem/projectItem";
import NewProjectButton from "../components/dashboard/newProjectButton/newProjectButton";
import { signOut } from "next-auth/react";
import { clearProjectData } from "@/app/redux/slices/app.slice";
import { clearThumbnailData } from "@/app/redux/slices/thumbnail.slice";
import { clearTitleData } from "@/app/redux/slices/title.slice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("Projects");
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects/read");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      const sortedProjects = data.projects.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProjects(sortedProjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

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
      fetchProjects();
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
  const isSubscribed = () => {
    return session?.user?.subscriptionStatus === "active";
  };

  return (
    <div className="flex flex-col max-w-7xl py-32 h-screen mx-auto">
      <div className="flex relative gap-4 items-center justify-center space-x-4 ">
        <div className="w-22 rounded-full p-1 bg-gradient-to-br from-pink-500 via-blue-500 animate-gradient-x">
          <Image
            src={session?.user?.image}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className="relative flex flex-col gap-1" ref={dropdownRef}>
          <div className="flex gap-2 items-center">
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
            <div className="absolute top-10 left-0 w-[200px] bg-white shadow-md rounded-md">
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
      {projects.length > 11 && (
        <div className="absolute right-4 top-4 flex items-center space-x-4">
          <button className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
        {isSubscribed() ? (
          <NewProjectButton />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Subscribe to Create
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Upgrade to Pro to create unlimited projects
            </p>
            <Link
              href="/pricing"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
