import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./lib/auth";

const secret = process.env.NEXTAUTH_SECRET || "4~>6,NLmj&S|L@v&*:x/ny_kx";
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req,
    secret,
  });

  if (!token && path !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }

  // if (!req.cookies.has("token")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // } else if (path === "/" && req.cookies.has("token")) {
  //   return NextResponse.redirect(new URL("/dashboard/home", req.url));
  // } else {
  //   return NextResponse.next();
  // }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
