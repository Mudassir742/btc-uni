// lib/getRequestCookie.ts
import { UserSession } from "@/interfaces";
import { unsealData } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns SessionUser or null
 */
async function getRequestCookie(
  cookies: ReadonlyRequestCookies,
  encryptedSession?: string | null
): Promise<UserSession | null> {
  try {
    const cookieName = process.env.SESSION_COOKIE_NAME as string;
    const found = encryptedSession ?? cookies.get(cookieName)?.value;

    if (!found) return null;

    const { user } = await unsealData(found, {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
    });

    return user as UserSession;
  } catch (error) {
    console.log(error);
    return null;
  }
}
