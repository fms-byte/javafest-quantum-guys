import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { appUrl } from "./setupEnv";

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/feed",
  "/feed/[id]",
];
const protectedRoutes = ["/profile"];

export default async function AuthMiddleware(
  req: NextRequest
) {
  if (
    !protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  } else {
    const myCookie = cookies();

    let token: string | null = null;
    if (myCookie && myCookie.get("token")) {
      token = myCookie.get("token")!.value;
    }

    if (
      !token &&
      protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect(`${appUrl}/login`);
    } else if (
      token &&
      publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect(`${appUrl}/feed`);
    }
  }
}
