import { useSelector } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, LogOut, Folder } from "react-feather";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDetails() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isAuthenticated || !user) {
    return <div>Not signed in</div>;
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 p-4 border-b border-zinc-100 dark:border-zinc-700">
        <Image
          src={user.image}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-grow">
          <div className="font-bold text-sm">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <button
          onClick={toggleDropdown}
          className="focus:outline-none hover:bg-zinc-200 dark:hover:bg-zinc-700 p-1 rounded-md"
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-10 right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-md z-10">
          <ul>
            <li>
              <button
                onClick={() => {
                  router.push("/studio");
                }}
                className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 w-full text-left"
              >
                <Folder className="w-4 h-4 mr-2" />
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 w-full text-left"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
