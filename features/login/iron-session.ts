import { IronSessionOptions } from "iron-session";

// And some more iron-session stuff:
export const ironOptions: IronSessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME!,
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    // expire in 20 sec
    // expires: new Date(Date.now() + 20 * 1000),

    secure: process.env.NODE_ENV === "production",
  },
  // ttl: 20,
};
