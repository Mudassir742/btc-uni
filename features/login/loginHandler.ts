import {
  AuthSource,
  IUserSession,
  LoginInput,
  LoginProviderEnum,
  UserSession,
} from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/features/login/authenticate";
import { userDataHandler } from "./userDataHandler";
import { handleError } from "@/utils/stripeErrorHandling";
import { createUrl, objectToURLSearchParams } from "@/utils/url";

export const loginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  input: LoginInput,
  source: AuthSource,
  restSearchParams?: IObj

) => {
  const { login: data, errors } = await authenticate(input, "login");
  // Store the session data.
  let user = {
    ...data,
    isLoggedIn: errors?.length ? false : true,
  } as UserSession;

  // Stripe and wp customer handler
  await userDataHandler(user, source)
    .then((usr) => {
      user = usr as UserSession;
    })
    .catch((e) => {
      handleError(e);
    });

  const session = req.session as IUserSession;
  session.user = user;
  await req.session.save();

  if (errors?.length) {
    // send an error response.
    if (input.provider === LoginProviderEnum.Password) {
      return res.status(401).json({
        user,
        errors,
      });
    } else {
      return res.redirect(`/login?error=${errors[0].message}`);
    }
  }

  // send a success response.
  if (input.provider === LoginProviderEnum.Password) {
    res.status(errors?.length ? 401 : 200).json({
      user: {
        ...user,
        authToken: undefined,
        refreshToken: undefined,
      },
      errors,
    });
  } else {

    let params = objectToURLSearchParams(restSearchParams ?? {})
    let newParams = new URLSearchParams(params)
    newParams.delete("originalState")
    if (newParams.get("subscription")) {
      return res.redirect(createUrl("/basics", newParams));
    } else {
      if (newParams.get("source") === "login") {
        return res.redirect(createUrl("/", newParams));
      } else {
        return res.redirect(createUrl("/basics", newParams));
      }
    }

  }
};
