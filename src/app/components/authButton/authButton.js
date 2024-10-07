"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "@/app/redux/slices/user.slice";
import { useEffect } from "react";

export default function AuthButton() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user));
    } else {
      dispatch(removeUser());
    }
  }, [session, dispatch]);

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  );
}
