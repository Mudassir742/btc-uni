import { UserSession } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "./getSession";
import { refreshAuthToken } from "../login/refreshToken";
import { isTokenExpired } from "../login/isTokenValid";
import { destroySession } from "./destroySession";
import { createUrl } from "@/utils/url";
import { getProfile } from "../wp/user";
import { restrictedPathsOnboarding } from "@/lib/constants";

export async function handleSessionError(req: NextRequest, session: Session): Promise<NextResponse | null> {
    if (session?.error) {
        await destroySession(req);
        return NextResponse.next();
    }
    return null;
}

export async function handleRestrictedPaths(
    req: NextRequest,
    user: UserSession | null,
    session: Session,
    restrictedPaths: string[]
): Promise<NextResponse | null> {
    const sessionErrorResponse = await handleSessionError(req, session);
    if (sessionErrorResponse) return sessionErrorResponse;

    const isPathRestricted = restrictedPaths.some(path => req.nextUrl.pathname.startsWith(path));

    if (isPathRestricted) {
        const userAccessResponse = await handleUserAccess(req, user, session, restrictedPaths);
        if (userAccessResponse) return userAccessResponse;

        const tokenExpiryResponse = await handleTokenExpiryAndRefresh(user!, session, req);
        if (tokenExpiryResponse) return tokenExpiryResponse;
    }

    return null;
}

export async function handleTokenExpiryAndRefresh(
    user: UserSession,
    session: Session,
    req: NextRequest
): Promise<NextResponse | null> {
    if (user?.authToken && user?.refreshToken) {
        const isTokenExp = await isTokenExpired(user.authToken);

        if (isTokenExp) {
            try {
                const authToken = await refreshAuthToken(user.refreshToken);

                if (!authToken) {
                    session.destroy();
                    return NextResponse.redirect(new URL("/log-in", req.url));
                }

                user.authToken = authToken;
                user.isLoggedIn = true;
                session.user = user;

                await session.save();
                // Lazy import sealData from iron-session
                const { sealData } = await import("iron-session/edge");
                const encryptedSession = await sealData(session, {
                    password: process.env.SECRET_COOKIE_PASSWORD!,
                });

                const headers = new Headers(req.headers);
                headers.set("auth-session", req.cookies.get("auth-session")?.value!);

                return NextResponse.next({
                    headers: {
                        "Set-Cookie": `${process.env.SESSION_COOKIE_NAME}=${encryptedSession}`,
                    },
                    status: 200,
                    request: {
                        headers: headers,
                    },
                });
            } catch (error) {
                console.error("Middleware Catch Error: ", error);
                user.isLoggedIn = false;
                session.user = user;
                await session.destroy();
                return NextResponse.redirect(new URL("/log-in", req.url));
            }
        }
    }

    return null;
}

export async function handleUserAccess(
    req: NextRequest,
    user: UserSession | null,
    session: Session,
    restrictedPaths: string[]
): Promise<NextResponse | null> {
    const isPathRestricted = restrictedPaths.some(path => req.nextUrl.pathname.startsWith(path));
    if (isPathRestricted) {
        if (!session.user?.isLoggedIn) {
            session.destroy();
        }

        if (!user || !user?.isLoggedIn) {
            const searchParams = new URLSearchParams(req.nextUrl.searchParams)
            searchParams.append("redirectUrl", req.nextUrl.pathname)
            return NextResponse.redirect(
                new URL(
                    createUrl("/log-in", searchParams),
                    req.url
                )
            );

            // Redirect the user if they didn't complete the basics form
        }

        const basicsFormCompleted = restrictedPathsOnboarding.some(path => req.nextUrl.pathname.startsWith(path));
        if (basicsFormCompleted) {
            const userAdditionalData = await getProfile(user.userData?.databaseId!);
            const searchParams = new URLSearchParams(req.nextUrl.searchParams)
            searchParams.append("redirectUrl", req.nextUrl.pathname)
            if (!userAdditionalData?.user?.address?.address1) {
                return NextResponse.redirect(new URL(createUrl("/basics", searchParams),
                    req.url));
            }

        }
    } else {
        const basicsFormCompleted = restrictedPathsOnboarding.some(path => req.nextUrl.pathname.startsWith(path));

        if ((basicsFormCompleted && user?.isLoggedIn) || (req.nextUrl.pathname === "/" && user?.isLoggedIn)) {
            const userAdditionalData = await getProfile(user?.userData?.databaseId!);
            const searchParams = new URLSearchParams(req.nextUrl.searchParams)
            searchParams.append("redirectUrl", req.nextUrl.pathname)

            if (!userAdditionalData?.user?.address?.address1) {
                return NextResponse.redirect(new URL(createUrl("/basics", searchParams),
                    req.url));
            }

        }
    }

    return null;
}


const publicApiUrls = ["/api/auth"]

export const handleApiSecurity = (req: NextRequest,
) => {
    let pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/api") && !publicApiUrls.some((path) => pathname.startsWith(path))) {
        const apiKey = req.headers.get("x-api-key") || req.nextUrl.searchParams.get("secret");
        if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
            return NextResponse.next()
        } else {
            return NextResponse.json({ message: "Forbidden" }, {
                status: 403
            })
        }
    } else {
        null
    }

}