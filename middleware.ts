import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "apex_admin_token";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/BuilderDashboard") && !token) {
    return NextResponse.redirect(new URL("/Builder", request.url));
  }

  if (pathname.startsWith("/Builder") && !pathname.startsWith("/BuilderDashboard") && token) {
    return NextResponse.redirect(new URL("/BuilderDashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Builder", "/BuilderDashboard/:path*"],
};
