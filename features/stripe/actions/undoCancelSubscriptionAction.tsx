'use server'
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";


// Cancel SUbscription
export const UndoCancelSubscriptionFromStripe = async (subId: string, subsScheduleId?: string) => {
  try {

    const canceledSub = await stripe.subscriptions.update(subId, {
      cancel_at_period_end: false,
    })
    return JSON.stringify(canceledSub)

  } catch (err) {
    console.log(err)
    throw new Error("Something went wrong!")
  }
}