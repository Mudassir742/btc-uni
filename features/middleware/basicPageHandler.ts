import { Address, UserSession } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { getUserAddress } from "@/features/login/userHandler";

export const basicPageHandler = async (req: NextRequest, user: UserSession) => {
  const res = await getUserAddress(user, {
    idType: "DATABASE_ID",
  });

  const address = res as Address;

  // Redirect user if  basic info already setup
  if (address?.country) {
    // Redirect to the subscription page
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next({
    headers: {
      userId: user?.userData?.databaseId?.toString() || "",
    },
  });
};
