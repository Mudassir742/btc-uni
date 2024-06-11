import { IUserSession } from "@/interfaces";
import { IronSessionOptions, getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse } from "next/server";

export const getSession = async (
  req: NextRequest,
  res: NextResponse,
  ironOptions: IronSessionOptions
) => {
  const session = (await getIronSession(req, res, ironOptions).catch(() => {
    return {
      user: {
        isLoggedIn: false,
      },
      error: "Invalid Session",
    } as { user: IUserSession["user"]; error?: string };
  })) as Session;

  return session
};

export type Session = IUserSession & { user: IUserSession["user"]; error?: string } 