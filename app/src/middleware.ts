import { NextRequest, NextResponse } from "next/server";
import { pingServerAction } from "./app/actions";
import { ROUTES, PUBLIC_PATHS } from "./config/constants";


function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname === path);
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
