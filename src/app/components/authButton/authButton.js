"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

export default function AuthButton() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  if (session) {
    return (
      <div className="flex text-md items-center space-x-2">
        <Image
          src={session.user.image}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col text-sm">
          <span>{session.user.name}</span>
          <div
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-zinc-400 rounded-md text-xs cursor-pointer underline"
          >
            Sign out
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/studio" })}
        className="px-4 py-2 border-2 text-blue-500 border-blue-500 rounded-xl hover:bg-blue-600 hover:text-white transition-colors flex items-center"
      >
        Sign in
      </button>
    </div>
  );
}
