"use client";
import { useSession } from "next-auth/react";

import ProjectList from "@/app/components/studio/projectList";
import UserDetails from "@/app/components/studio/userDetails/userDetails";
import Navigation from "@/app/components/studio/navigation/navigation";
export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col max-w-7xl py-32 h-screen mx-auto">
      <UserDetails session={session} />
      <Navigation />
      <ProjectList session={session} />
    </div>
  );
}
