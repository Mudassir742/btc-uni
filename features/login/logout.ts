import { NextApiRequest, NextApiResponse } from "next";

export const logoutHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  req.session.destroy();

  return res.status(200).json({ isLoggedIn: false });
};

export const handleLougout = async (cb: () => void) => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers:{
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      }
    });

    const res: { isLoggedIn: boolean } = await response.json();
    if (!res.isLoggedIn) {
      cb();
    }
  } catch (error) {
    console.log(error);
  }
};
