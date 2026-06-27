import { NextRequest, NextResponse } from "next/server";
import { pingServerAction } from "./app/actions";
import { ROUTES, PUBLIC_PATHS } from "./config/constants";

// First path segments that belong to the app — not user namespaces
const RESERVED_SEGMENTS = new Set([
  "auth", "home", "addLink", "profile", "feedback", "api", "share", "_next",
]);

function isPublic(pathname: string) {
  if (PUBLIC_PATHS.some((path) => pathname === path)) return true;
  // /<username>/<slug> public collection pages
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 2 && !RESERVED_SEGMENTS.has(parts[0])) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const response = await pingServerAction();

  if (!response.success) {
    const loginUrl = new URL(ROUTES.LOGIN, req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
