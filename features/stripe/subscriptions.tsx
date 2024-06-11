// stripe
import { GET_USERS_SUBSCRIPTION, GET_USER_EDU_INFO } from "@/graphql/queries";
import { subscriptionIds } from "@/lib/constants";
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { cache } from "react";
import Stripe from "stripe";

export const getStripeSubs = cache(async () => {
  try {
    // Define the URL and parameters for the Stripe API request
    const url = new URL("https://api.stripe.com/v1/products");
    const params: { [key: string]: string | string[] } = {
      // Add index signature
      expand: ["data.default_price"],
      type: "service",
      active: "true",
      ids: subscriptionIds,
    };

    Object.keys(params).forEach((key) => {
      const paramValue = params[key];
      if (Array.isArray(paramValue)) {
        paramValue.forEach((value) =>
          url.searchParams.append(`${key}[]`, value)
        );
      } else {
        url.searchParams.append(key, paramValue);
      }
    });

    // Make the fetch request to the Stripe API
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    // Parse the response as JSON
    const product = await response.json();
    return product as Stripe.Response<Stripe.ApiList<Stripe.Product>>;
  } catch (error) {
    handleError(error);
  }
});

// Memorize the request
export const getStripeSubById = cache(async (id: string) => {
  try {
    // Get products from Stripe
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });
    return product;
  } catch (error) {
    handleError(error);
  }
});

export interface ICurrentUserSub {
  title: string;
  databaseId: number;
  subscriptionMetadata: {
    paymentStatus: string;
    subscriptionrenewson: string;
    subscriptionexpireson: string | null;
    stripesubscriptionid: string;
    upcomingsubscriptionid: string;
    stripesubscriptionscheduleid?: string;
    subscriptionstartson: string;
    tigiftrecipientemail?: string;
    subscriptioncanceledon?: string
    subscriptiontype: {
      databaseId: number;
      title: string;
    };
  };
}

// Get customer subscription by from wp
export const getCustomerSubs = async (userDataId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // cache: "force-cache",
    body: JSON.stringify({
      query: GET_USERS_SUBSCRIPTION.loc?.source.body,
      variables: {
        authorId: Number(`${userDataId}`),
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const currentUserData = data as {
    subscriptions: { nodes: ICurrentUserSub[] };
  };
  return currentUserData.subscriptions.nodes[0];
};

interface IUserEduInfo {
  userDataMetadata: {
    likedCourses: {
      id: string;
    }[];
    certificates: {
      id: string;
    }[];
  };
}
// Get customer subscription by from wp
export const getCustomerInfo = async (userDataId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // cache: "force-cache",
    body: JSON.stringify({
      query: GET_USER_EDU_INFO.loc?.source.body,
      cache: "no-cache",
      variables: {
        id: Number(`${userDataId}`),
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const currentUserData = data as { userData: IUserEduInfo };
  return currentUserData.userData.userDataMetadata;
};

