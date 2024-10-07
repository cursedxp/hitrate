import { useSelector } from "react-redux";
import Image from "next/image";

export default function UserDetails() {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated || !user) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="flex items-center gap-2 p-4 border-b border-zinc-200 dark:border-zinc-700">
      <Image
        src={user.image}
        alt={user.name}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div>
        <div className="font-bold text-sm">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
    </div>
  );
}
