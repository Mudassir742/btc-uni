import { Address, IUserSession, UserSession } from "@/interfaces";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { isTokenExpired } from "@/features/login/isTokenValid";
import { refreshAuthToken } from "@/features/login/refreshToken";
import { NextResponse } from "next/server";
// Lib
import { GET_USER_ADDRESS } from "@/graphql/queries";
import { createClient } from "@/lib/apolloClient";
import { authHandleErrors } from "@/utils/authErrorHandling";

export const userHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session as IUserSession;
  const user: UserSession = session.user || ({} as IUserSession);

  // If the user doesn't have a refresh token, they're not logged in.
  if (!user?.refreshToken) {
    console.log("User is not logged in. Missing refresh token.");
    session.user = {
      ...user,
      isLoggedIn: false,
    };

    await session.save();

    return res.status(401).json({
      error: "User is not logged in.",
      user: user?.userData,
      isLoggedIn: user?.isLoggedIn,
    });
  }
  const isTokenExp = await isTokenExpired(user.authToken!);

  // If the user is missing an auth token or it is expired, try to refresh it.
  if (!user?.authToken || isTokenExp) {
    try {
      const authToken = await refreshAuthToken(user.refreshToken);

      // If the auth token is empty, log the user out.
      if (!authToken) {
        session.destroy();

        return res.status(401).json({
          error: "User is not logged in.",
          user: undefined,
          isLoggedIn: false,
        });
      }

      user.authToken = authToken;
      user.isLoggedIn = true;

      // update the user session.
      session.user = user;

      await session.save();

      return res.status(200).json({
        user: user?.userData,
        isLoggedIn: user.isLoggedIn,
      });
    } catch (error) {
      // This means the mutation failed, so the user is not logged in.
      // We don't destroy the session here, because we want to keep the stale data in case the server fixes itself.
      console.log("Catch Error: ", error);
      user.isLoggedIn = false;

      session.user = user;

      await session.save();

      return res.status(401).json({
        error: "User is not logged in.",
        user: user?.userData,
        isLoggedIn: user.isLoggedIn,
      });
    }
  }

  // If the user has an auth token and it's not expired, they're logged in.
  return res.status(200).json({ user });
};

export const getUserAddress = async (
  user: UserSession,
  opt: {
    idType: "DATABASE_ID" | "EMAIL";
  } = {
      idType: "DATABASE_ID",
    }
): Promise<Address & { firstName: string, lastName: string, phone:string } | string> => {
  try {
    const client = createClient(user.authToken!);

    const { data, error, networkStatus } = await client.query({
      query: GET_USER_ADDRESS,
      errorPolicy: "all",
      variables: {
        idType: opt.idType,
        id: user.userData?.databaseId,
      },
    });

    if (error) {
      throw error;
    } else if (!data.user) {
      throw new Error("User not found.");
    }

    const resData = data as {
      user: {
        address: Address;
        firstName: string;
        lastName: string;
        phone:string
      };
    };

    return { ...resData.user.address, firstName: resData.user.firstName, lastName: resData.user.lastName, phone:resData.user.phone};
  } catch (error) {
    return authHandleErrors(error);
  }
};
