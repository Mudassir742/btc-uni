import { IUserSession, UserSession } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "@/features/login/isTokenValid";
import { refreshAuthToken } from "@/features/login/refreshToken";
import { getSession } from "@/features/middleware/getSession";
import { ironOptions } from "@/features/login/iron-session";

export const middlewareAuthHandler = async (
  req: NextRequest,
  session: IUserSession,
  user: UserSession
) => {
  // Check if the user is logged in. if not, redirect to /login page
  if (!user || !user?.isLoggedIn) {
    return NextResponse.redirect(new URL("/log-in", req.url)); // redirect to /login page
  }

  // if token is expired, try to refresh it.
  const isTokenExp = await isTokenExpired(user?.authToken!);

  if (isTokenExp && user?.refreshToken) {
    try {
      const authToken = await refreshAuthToken(user.refreshToken);

      // If the auth token is empty, log the user out.
      if (!authToken) {
        session.destroy();

        return NextResponse.redirect(new URL("/log-in", req.url)); // redirect to /login page
      }
      user.authToken = authToken;
      user.isLoggedIn = true;

      // update the user session.
      session.user = user;

      await session.save();
    } catch (error) {
      // This means the mutation failed, so the user is not logged in.
      // We don't destroy the session here, because we want to keep the stale data in case the server fixes itself.
      console.log("Middleware Catch Error: ", error);
      user.isLoggedIn = false;

      session.user = user;
      await session.save();
      return NextResponse.redirect(new URL("/log-in", req.url)); // redirect to /login page
    }
  }
};
