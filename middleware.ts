// /middleware.ts
// Types
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Features
import { ironOptions } from "@/features/login/iron-session";
import { Session, getSession } from "@/features/middleware/getSession";
import { redirectLoggedInUserFromPages } from "./features/middleware/isLoggedIn";
import { handleApiSecurity, handleRestrictedPaths, handleSessionError, handleTokenExpiryAndRefresh, handleUserAccess } from "./features/middleware"
import { createUrl } from "./utils/url";
import { category } from "./app/support/helper";
// Edge data
import { get } from '@vercel/edge-config';


export const middleware = async (req: NextRequest) => {

  // Check Edge Config to see if the maintenance page should be shown
  const isInMaintenanceMode = false;
  if (isInMaintenanceMode && req.nextUrl.pathname !== "/maintenance") {
    req.nextUrl.pathname = `/maintenance`

    // Rewrite to the url
    return NextResponse.redirect(req.nextUrl)
  }

  let res = NextResponse.next();
  const session = await getSession(req, res, ironOptions);

  const { user } = session;

  // Handle session errors
  const sessionErrorResponse = await handleSessionError(req, session);
  if (sessionErrorResponse) return sessionErrorResponse;

  // Define restricted paths
  const restrictedPaths = ["/checkout", "/basics", "/subscription", "/update-subscription", "/completed", "/profile", "/complete"];

  // Restrict api access without api key
  const handleApiSecurityRes = handleApiSecurity(req)
  if (handleApiSecurityRes) return handleApiSecurityRes;

  // Handle restricted paths
  const restrictedPathResponse = await handleRestrictedPaths(req, user, session, restrictedPaths);
  if (restrictedPathResponse) return restrictedPathResponse;

  // Handle token expiry and refresh
  const tokenExpiryResponse = await handleTokenExpiryAndRefresh(user, session, req);
  if (tokenExpiryResponse) return tokenExpiryResponse;

  // Handle user access
  const userAccessResponse = await handleUserAccess(req, user, session, restrictedPaths);
  if (userAccessResponse) return userAccessResponse;
  // If the user is logged in, don't let them go to restricted page for example /log-in.
  // Also handled subscription page logic
  res = await redirectLoggedInUserFromPages(req, user) ?? res;

  // Support page path
  if (req.nextUrl.pathname.startsWith("/support")) {
    if (!req.nextUrl.searchParams.get("q")) {
      const newSp = new URLSearchParams(req.nextUrl.searchParams);
      newSp.set("q", category[0].link)
      return NextResponse.redirect(new URL(createUrl("/support", newSp), req.url));
    }
  }

  return res;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

