import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Request object:", req);
    console.log("NextAuth object:", req.nextauth);
    console.log("Token:", req.nextauth.token);

    if (
      req.nextUrl.pathname === "/admin-dashboard" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
    if (
      req.nextUrl.pathname === "/new" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        console.log("Authorized callback token:", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/new", "/admin-dashboard"],
};
