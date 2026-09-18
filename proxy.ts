import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/signin", "/signup"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSessionCookie = req.cookies.has("better-auth.session_token");

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !hasSessionCookie) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isAuthRoute && hasSessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};