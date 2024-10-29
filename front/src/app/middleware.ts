import { NextResponse } from "next/server";

export function middleware(req: any) {
  const isAuthenticated = req.cookies.get("token");

  if (!isAuthenticated && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api).*)"] };
