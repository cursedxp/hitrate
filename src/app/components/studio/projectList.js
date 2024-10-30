import { useFetchProjects } from "@/app/hooks/useFetchProjects";
import ProjectItem from "@/app/components/studio/projectItem/projectItem";
import NewProjectButton from "@/app/components/studio/newProjectButton/newProjectButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProjectList({ session }) {
  const isSubscribed = () => {
    return session?.user?.subscriptionStatus === "active";
  };
  const { loading, projects } = useFetchProjects();
  return (
    <section className="mt-20">
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
          <div className="text-4xl animate-bounce">🎬</div>
          <div className="text-gray-500">Loading your projects...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
          {isSubscribed() ? (
            <NewProjectButton session={session} />
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
        </div>
      )}
    </section>
  );
}
