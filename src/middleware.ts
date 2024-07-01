import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (
    url.pathname.startsWith("/checkout") ||
    url.pathname.startsWith("/account") ||
    url.pathname.startsWith("/cart") ||
    url.pathname.startsWith("/success")
  ) {
    if (!token || token.provider !== "credentials") {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
