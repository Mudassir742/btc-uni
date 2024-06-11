import { QueryClient } from "@tanstack/react-query";
import Stripe from "stripe";


const queryClient = new QueryClient();


export const centsToDollars = (cents: number): number => {
    return cents / 100; // Convert cents to dollars by dividing by 100
};



export const getUpcomingInvoice = async (customerId: string) => {
    const stripeApiKey = process.env.STRIPE_SECRET_KEY;

    const response = await fetch(
        `https://api.stripe.com/v1/invoices/upcoming?customer=${customerId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${stripeApiKey}`,
                "Content-Type": "application/json",
            },
        }
    );

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            `Failed to fetch upcoming invoice: ${responseData.error.message}`
        );
    }

    return centsToDollars(responseData.amount_due);
};
export const getStripeSubscription = async (subscriptionID: string) => {
    const stripeApiKey = process.env.STRIPE_SECRET_KEY;

    const response = await fetch(
        `https://api.stripe.com/v1/subscriptions/${subscriptionID}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${stripeApiKey}`,
                "Content-Type": "application/json",
            },
        }
    );

    const responseData: Stripe.Subscription = await response.json();

    if (!response.ok) {
        throw new Error(
            `Failed to fetch upcoming invoice: ${(responseData as unknown as { error: { message: string } }).error.message}`
        );
    }

    console.log(responseData)

    return responseData.cancel_at;
};

