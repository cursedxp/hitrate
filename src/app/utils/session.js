import { decode } from "next-auth/jwt";

export async function getUserFromToken(token) {
  if (!token) return null;
  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return decoded?.sub;
}
