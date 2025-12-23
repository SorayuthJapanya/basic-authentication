import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  // Redirect unautheneted users to the login page
  const token = req.cookies.get("token")?.value;
  // current path
  const { pathname } = req.nextUrl;

  // allow auth page
  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // if no token → redirect to /auth
  if (!token) {
    const loginUrl = new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|auth).*)"],
};
