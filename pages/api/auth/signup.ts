// src/pages/api/auth/login/[provider].ts
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
// Types
import { SignupInput } from "@/interfaces";
import { ironOptions } from "@/features/login/iron-session";
import { signupHandler } from "@/features/login/signupHandler";
// 


import * as z from "zod";

// export const dynamic = "force-dynamic";

const signupFormschema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body;

    if (req.method !== "POST")
      return res
        .status(405)
        .json({ errors: { message: "Method not allowed" } });

    const validPayload = signupFormschema.parse(body);

    const input: SignupInput = {
      email: validPayload.email,
      username: validPayload.email.replace(/\+/g, ""),
      is_verified: false
    };

    return signupHandler(req, res, input);
  } catch (error) {
    res.status(500).json({
      errors: error,
    });
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
