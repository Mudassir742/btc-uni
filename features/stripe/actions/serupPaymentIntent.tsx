/**
 * Creates a payment intent for a specified amount and customer.
 * @param amount - The amount in cents.
 * @param cusId - The customer ID.
 * @param metaData - Additional metadata for the payment intent.
 * @returns A JSON string representation of the created payment intent.
 * @throws An error if something goes wrong during the creation process.
 */
'use server'
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";
import Stripe from "stripe";

export const setupProductPurchaseIntent = async (params: Stripe.SetupIntentCreateParams) => {
    try {
        const intent = await stripe.setupIntents.create(params)
        return JSON.stringify(intent)
    } catch (err) {
        console.log(err)
        throw new Error("Something went wrong!")
    }
}
