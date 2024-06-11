"use server";
/**
 * Retrieves a coupon from Stripe using the provided ID and optional parameters.
 * @param id The ID of the coupon to retrieve.
 * @param params Optional parameters for the coupon retrieval.
 * @returns A Promise that resolves to the retrieved coupon.
 * @throws An error if the coupon retrieval fails.
 */
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";
import Stripe from "stripe";


export async function checkCouponCode(id: string, params?: Stripe.CouponRetrieveParams) {
    try {
        const response = await stripe.coupons.retrieve(id, params)
        return JSON.stringify(response)
    } catch (error) {
        return JSON.stringify(handleError(error));
    }
}

