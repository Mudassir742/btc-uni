'use server'
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";


// Cancel SUbscription
export const cancelSubscriptionFromStripe = async (subId: string, subsScheduleId?: string) => {
  try {
    if (subsScheduleId) {
      const canceledSubSchedule = await stripe.subscriptionSchedules.release(subsScheduleId)
      const canceledSub = await stripe.subscriptions.update(subId, {
        cancel_at_period_end: true,
        cancellation_details: {
          comment: "Canceled from the website",
        }
      })
      return JSON.stringify(canceledSub)
    } else {
      const canceledSub = await stripe.subscriptions.update(subId, {
        cancel_at_period_end: true,
        cancellation_details: {
          comment: "Canceled from the website",
        }
      })
      return JSON.stringify(canceledSub)
    }
  } catch (err) {
    console.log(err)
    throw new Error("Something went wrong!")
  }
}


