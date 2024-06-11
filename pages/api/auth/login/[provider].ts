// src/pages/api/auth/login/[provider].ts
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
// Types
import { AuthSource, LoginInput, LoginProviderEnum } from "@/interfaces";
import { loginHandler } from "@/features/login/loginHandler";
import { ironOptions } from "@/features/login/iron-session";

export const dynamic = "force-dynamic";

const getProviderInput = async (
  provider: string,
  req: NextApiRequest
): Promise<LoginInput> => {
  const providerEnum = provider.toUpperCase() as LoginProviderEnum;

  switch (providerEnum) {
    // We need a different `case` for each provider type.
    case LoginProviderEnum.Password: {
      const body = req.body as {
        email: string;
        password: string;
      };

      return {
        provider: providerEnum,
        credentials: {
          username: body.email,
          password: body.password,
        },
      };
    }
    // OAuth2 Providers share the same input shape.
    case LoginProviderEnum.Google: {
      const input: LoginInput = {
        provider: providerEnum,
        oauthResponse: {
          code: req.query.code as string,
        },
      };

      // If there is a state, add it to the input.
      const state = req.query.state;
      if (state && input.oauthResponse) {
        input.oauthResponse.state = state as string;
      }

      return input;
    }
    case LoginProviderEnum.Facebook: {
      const input: LoginInput = {
        provider: providerEnum,
        oauthResponse: {
          code: req.query.code as string,
        },
      };

      // If there is a state, add it to the input.
      const state = req.query.state;
      if (state && input.oauthResponse) {
        input.oauthResponse.state = state as string;
      }

      return input;
    }
    case LoginProviderEnum.Instagram: {
      const input: LoginInput = {
        provider: providerEnum,
        oauthResponse: {
          code: req.query.code as string,
        },
      };

      // If there is a state, add it to the input.
      const state = req.query.state;
      if (state && input.oauthResponse) {
        input.oauthResponse.state = state as string;
      }

      return input;
    }
  }
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const provider = (req.query?.provider as string) || "";

  const input = await getProviderInput(provider, req);


  let source: AuthSource = "login";

  // Coupon Code for gift
  let couponId: string | undefined;
  // Rest Search Params
  let searchParams: IObj | undefined;
  try {
    searchParams = JSON.parse(req.query?.state as string)
    couponId = JSON.parse(req.query?.state as string)?.couponId;
    source = JSON.parse(req.query?.state as string)?.source;
  } catch (error) {
    source = "login";
  }

  return loginHandler(req, res, input, source, searchParams);
};

export default withIronSessionApiRoute(handler, (req, res) => {
  const body = req.body as {
    rememberMe?: boolean;
  };
  // const fifteenMinutesInSeconds = 2 * 60;


  return {
    ...ironOptions,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      maxAge: body.rememberMe ? 60 * 60 * 24 * 30 : undefined,
    },
    // ttl: fifteenMinutesInSeconds,
    // if remember me is tue then set the time to one month else set the time to 1day
    // ttl: body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  };
});
