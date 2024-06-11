import { GET_CATEGORY_PAGE_GENERAL_DATA_BASICS, GET_USERS_SUBSCRIPTION_SHORT } from "@/graphql/queries";
import { UserSession } from "@/interfaces";
import { createUrl } from "@/utils/url";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { checkIsRenewable, checkSubIsValidSubscriptionObject } from "@/utils/subValidation";

// Define the paths you want to prevent access to in an array
const restrictedPathsForLoggedInUsers: string[] = [
    // "/api/auth/login",
    "/log-in",
    "/signup",
    "/subscribe",
    "/update-subscription",
    "/profile"
    // Add any other paths as needed
];

/**
 * Redirect logged-in users from specified pages.
 * 
 * @param req - The Next.js request object.
 * @param user - The user object from the session.
 * @returns - A NextResponse object to redirect the user or null if no action is needed.
 */


const checkUserSubscription = async (user: UserSession) => {
    try {

        const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: GET_USERS_SUBSCRIPTION_SHORT.loc?.source.body,
                variables: {
                    authorId: Number(user.userData?.databaseId),
                },
            }),
        });

        const { data, errors } = await response.json();


        if (errors) {
            throw generateWpPageError(errors)
        }

        const subData = data.subscriptions?.nodes[0]

        // const validSub = checkIsRenewable(subData?.subscriptionMetadata?.paymentStatus, subData?.subscriptionMetadata?.subscriptionexpireson,  subData?.subscriptionMetadata?.subscriptionrenewson)

        const validSub = await checkSubIsValidSubscriptionObject(subData)
        const checkSubIsCancelled = subData?.subscriptionMetadata?.subscriptioncanceledon ? true : false
        return subData && (validSub && !checkSubIsCancelled) ? true : false

    } catch (error) {
        console.log(error)
        return null
    }
}

const redirectLoggedInUserFromPages = async (
    req: NextRequest,
    user: UserSession | null
): Promise<NextResponse | null> => {
    // Check if the user is logged in and is trying to access a restricted path
    if (
        user?.isLoggedIn &&
        restrictedPathsForLoggedInUsers.some(path => req.nextUrl.pathname.startsWith(path))
    ) {
        if (req.nextUrl.pathname === "/subscribe") {
            // Given an incoming request...
            const newHeaders = new Headers(req.headers)
            // Add a new header
            newHeaders.set('x-subscription', 'new')

            return NextResponse.next({
                request: {
                    // New request headers
                    headers: newHeaders,
                },
            });
        }
        // If Authenticated user tries to access subscribe page
        // if (req.nextUrl.pathname === "/subscribe" || req.nextUrl.pathname === "/update-subscription" || (req.nextUrl.pathname === "/profile" && req.nextUrl.searchParams.get('q') === "update-subscription")) {

        //     const isSubscribed = await checkUserSubscription(user);
        //     if (!isSubscribed) {
        //         if (req.nextUrl.pathname === "/subscribe") {
        //             // Given an incoming request...
        //             const newHeaders = new Headers(req.headers)
        //             // Add a new header
        //             newHeaders.set('x-subscription', 'new')

        //             return NextResponse.next({
        //                 request: {
        //                     // New request headers
        //                     headers: newHeaders,
        //                 },
        //             });
        //         }
        //         // else if (req.nextUrl.pathname === "/update-subscription" ||
        //         //     (req.nextUrl.pathname === "/profile" && req.nextUrl.searchParams.get('q') === "update-subscription")) {
        //         //     // Given an incoming request...
        //         //     const newHeaders = new Headers(req.headers)
        //         //     // Add a new header
        //         //     newHeaders.set('x-subscription', 'new')
        //         //     return NextResponse.redirect(new URL(createUrl("/subscribe", req.nextUrl.searchParams), req.url), {
        //         //         headers: newHeaders
        //         //     });
        //         // }
        //     }
        //     else if (isSubscribed && (req.nextUrl.pathname === "/update-subscription" || (req.nextUrl.pathname === "/profile" &&
        //         req.nextUrl.searchParams.get('q') === "update-subscription"))) {
        //         return NextResponse.next();
        //     }

        //     return NextResponse.redirect(new URL(createUrl("/update-subscription", req.nextUrl.searchParams), req.url));
        // }
        // If subscription is selected and user is logged-in
        if (req.nextUrl.searchParams.has("subscription") && req.nextUrl.searchParams.has("qty")) {
            return NextResponse.redirect(new URL(createUrl("/basics", req.nextUrl.searchParams), req.url));
        }
        // If subscription is purchased
        else if (req.nextUrl.pathname === "/profile") {
            return NextResponse.next();
        }
        // Redirect to the home page or any other page as desired
        return NextResponse.redirect(new URL(createUrl("/", req.nextUrl.searchParams), req.url));
    }

    // No action needed, return null
    return null;
};

export { redirectLoggedInUserFromPages };
