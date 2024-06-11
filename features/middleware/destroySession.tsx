import { NextRequest, NextResponse } from "next/server";

export const destroySession = (req: NextRequest) => {
  const response = NextResponse.redirect(new URL("/login", req.url)); // redirect to /login page
  response.cookies.delete(process.env.SESSION_COOKIE_NAME!);
  return response; // redirect to /login page
};

