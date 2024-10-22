"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Plus } from "react-feather";
import ProjectItem from "../components/dashboard/projectItem/projectItem";
import NewProjectButton from "../components/dashboard/newProjectButton/newProjectButton";
import Modal from "../components/modal/modal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState("Projects");
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
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
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col max-w-7xl py-32 h-screen mx-auto">
      <div className="flex flex-col relative gap-4 text-center items-center space-x-4">
        <div className="w-22 rounded-full p-1 bg-gradient-to-br from-pink-500 via-blue-500 animate-gradient-x">
          <Image
            src={session?.user?.image}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
        <nav className="">
          <ul className="flex mt-4 space-x-4">
            {["Projects", "Collections"].map((item) => (
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
      </div>
      <div className="absolute right-4 top-4 flex items-center space-x-4">
        <button className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
        <NewProjectButton onClick={() => setIsModalOpen(true)} />
      </section>
    </div>
  );
}
