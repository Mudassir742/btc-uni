import {
  IUserSession,
  LoginProviderEnum,
  SignupInput,
  UserSession,
} from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/features/login/authenticate";
// Lib
import { stripe } from "@/lib/stripe-server";
import { createClient } from "@/lib/apolloClient";
import { CREATE_USER_DATA } from "@/graphql/mutations";
import { createUserData } from "@/features/login/createUserData";
import { createCustomerOnStripe } from "@/features/stripe/customer";

export const signupHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  input: SignupInput
) => {
  try {
    const { login: data, errors } = await authenticate(input, "signup");

    // Store the session data.
    let user = {
      ...data,
      isLoggedIn: errors?.length ? false : true,
    } as UserSession;

    // Create customer in stripe
    if (user.isLoggedIn) {
      // Run requests in parallel
      const [userData, stripeData] = await Promise.all([
        createUserData(user),
        createCustomerOnStripe(user),
      ]);

      user = {
        ...userData,
        ...stripeData,
      };
    }

    const session = req.session as IUserSession;
    session.user = user;
    await req.session.save();

    if (errors?.length) {
      // send an error response.
      return res.status(401).json({
        user,
        errors,
      });
    } else {
      return res.status(200).json({
        ...user,
      });
    }
  } catch (error) {
    console.log("Something went wrong ", error);
    return res.status(401).json({
      error,
    });
  }
};
