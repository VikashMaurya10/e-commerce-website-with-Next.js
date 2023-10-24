import { NextResponse } from "next/server";
import { verifyAuth } from "./helpers/verifyAuth";

// Limit the middleware to paths starting
export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/auth/logout"],
};

export async function middleware(req) {
  const path = req.nextUrl.pathname.slice(1);

  // get token from header
  // const headersInstance = req.headers;
  // const token = headersInstance.get("token");

  // get token form cookie
  const token = await req.cookies?.get("token")?.value;
  const isVeryfiedToken = await verifyAuth(token);

  // if token is not there then redirect user to login
  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${path}`, req.url));
  }

  if (!isVeryfiedToken || !token) {
    return Response.json(
      { message: "Authentication requied!" },
      { status: 401 }
    );
  }
}
