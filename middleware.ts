import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "SUPER_SECRET",
);

const SIGNIN_URL = "/Auth/Signin";
const PROTECTED_ROUTES = ["/admin", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(SIGNIN_URL, req.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL(SIGNIN_URL, req.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
