"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slices/user.slice";
import { useEffect } from "react";
import Loader from "@/app/components/loader/loader";
export default function StudioLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session) {
      dispatch(setUser(session.user));
    }
  }, [status, session, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return <div>{children}</div>;
  }

  router.push("/");
  return null;
}
