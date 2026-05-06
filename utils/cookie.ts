import { serialize } from "cookie";

export function setCookie(token: string) {
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearCookie() {
  return serialize("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
}
