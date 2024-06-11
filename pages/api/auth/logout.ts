import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
//  Iron Session
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/features/login/iron-session";
// Handler
import { logoutHandler } from "@/features/login/logout";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return logoutHandler(req, res);
};

export default withIronSessionApiRoute(handler, ironOptions);

