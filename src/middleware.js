import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = {
  STUDIO: "/studio",
  EDITOR: "/studio/editor",
  PROJECTS_API_CREATE: "/api/projects/create",
  PROJECTS_API_UPDATE: "/api/projects/update",
  PROJECTS_API_DELETE: "/api/projects/delete",
};

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/studio/:path*",
    "/studio/editor/:path*",
    "/api/projects/create",
    "/api/projects/update",
    "/api/projects/delete",
  ],
};
