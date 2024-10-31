import { NextResponse } from "next/server";

const PROTECTED_ROUTES = {
  STUDIO: "/studio",
  EDITOR: "/studio/editor",
  PROJECTS_API_CREATE: "/api/projects/create",
  PROJECTS_API_UPDATE: "/api/projects/update",
  PROJECTS_API_DELETE: "/api/projects/delete",
};
const authMiddleware = async (request) => {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = Object.values(PROTECTED_ROUTES).some(
    (route) => path.startsWith(route) || path === route
  );

  if (isProtectedRoute) {
    const sessionToken = request.cookies.get("next-auth.session-token")?.value;

    if (!sessionToken) {
      const loginUrl = new URL("/api/auth/signin", request.url);
      loginUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    ...Object.values(PROTECTED_ROUTES),
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default authMiddleware;
