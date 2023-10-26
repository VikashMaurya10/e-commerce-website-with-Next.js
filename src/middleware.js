import { NextResponse } from "next/server";
import { verifyAuth } from "./helpers/verifyAuth";

// Limit the middleware to paths starting
export const config = {
  matcher: ["/dashboard/(.*)", "/api/user/:path*", "/api/auth/logout"],
};
// /(.*) or /:path* same

export async function middleware(req) {
  const path = await req.nextUrl.pathname;
  const redirectPathPattern = path.slice(1);
  // console.log("path>>>>>", path);

  // get token form header
  // const headersInstance = req.headers;
  // const token = headersInstance.get("token");

  // get token form cookie
  const token = await req.cookies?.get("token")?.value;
  const isVeryfiedToken = await verifyAuth(token);
  // isVeryfiedToken has _id , role

  // check if user isAdmin then he/she not able to visit to user dashboard
  if (isVeryfiedToken?.role == 0 && path.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL(`/dashboard/user`, req.url));
  }
  if (isVeryfiedToken?.role == 1 && path.startsWith("/dashboard/user")) {
    return NextResponse.redirect(new URL(`/dashboard/admin`, req.url));
  }

  // if token is not there then redirect user to login
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${redirectPathPattern}`, req.url)
    );
  }

  if (!isVeryfiedToken || !token) {
    return Response.json(
      { message: "Authentication requied!" },
      { status: 401 }
    );
  }
}
