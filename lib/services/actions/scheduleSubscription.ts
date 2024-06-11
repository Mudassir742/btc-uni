"use server";

import { ICurrentUserSub } from "@/features/stripe/subscriptions";
import { annualSubWP, monthlySubWP } from "@/lib/constants";
import { formatDateToDisplay, formatWpToStripeDate } from "@/utils/formatDate";
import Stripe from "stripe";

type ScheduleSub = (
  upcomingSubWpId: string,
  { }: {
    priceData: Stripe.Price;
    coupon: string | null;
    currentWpSub: ICurrentUserSub;
    cardId?: string;
    // productSubStripeId: string;
    // currentPeriodEnd: string;
    // scheduleId?: string;
  }
) => Promise<string | undefined>;

/**
 * Schedule a subscription update for a customer.
 * @param upcomingSubWpId - The ID of the subscription to update.
 * @param options - The options for the subscription update.
 * @returns A promise that resolves to the updated subscription schedule.
 */
export const scheduleSub: ScheduleSub = async (
  upcomingSubWpId,
  { priceData, currentWpSub, cardId, coupon }
) => {
  const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const sub = currentWpSub.subscriptionMetadata;

  if (!sub?.stripesubscriptionscheduleid) {
    // Create a subscription schedule from the existing subscription
    let schedule = await stripe.subscriptionSchedules.create({
      from_subscription: sub.stripesubscriptionid,
      // end_behavior: "release", // Continue the subscription with the last phase settings
    });

    // Update the subscription schedule to add the desired phase
    let updateSubscriptionSchedule = await stripe.subscriptionSchedules.update(
      schedule.id,
      {
        end_behavior: "release",
        metadata: {
          updatedWpSubscriptionId: upcomingSubWpId,
        },

        default_settings: {
          default_payment_method: cardId,
        },
        phases: [
          {
            items: [
              {
                price: schedule.phases[0].items[0].price as string,
                quantity: schedule.phases[0].items[0].quantity,
              },
            ],
            coupon: Number(upcomingSubWpId) === annualSubWP ? (coupon == null ? "NEWANNUAL" : coupon) : Number(upcomingSubWpId) === monthlySubWP ? (coupon == null ? "NEWMONTHLY" : coupon) : coupon || undefined,
            start_date: schedule.phases[0].start_date,
            end_date: schedule.phases[0].end_date,
          },
          {
            items: [
              {
                price: priceData.id,
                quantity: 1,
              },
            ],
            coupon: Number(upcomingSubWpId) === annualSubWP ? (coupon == null ? "NEWANNUAL" : coupon) : Number(upcomingSubWpId) === monthlySubWP ? (coupon == null ? "NEWMONTHLY" : coupon) : coupon || undefined,
            start_date: formatWpToStripeDate(sub.subscriptionrenewson),
          },
        ],
      }
    );

    return JSON.stringify(updateSubscriptionSchedule);
  } else {
    const subscriptionSchedule = await stripe.subscriptionSchedules.retrieve(
      sub.stripesubscriptionscheduleid
    );

    let updateSubscriptionSchedule = await stripe.subscriptionSchedules.update(
      sub.stripesubscriptionscheduleid,
      {
        metadata: {
          updatedWpSubscriptionId: upcomingSubWpId,
        },
        end_behavior: "release",
        phases: [
          {
            items: [
              {
                price: subscriptionSchedule.phases[0].items[0].price as string,
                quantity: 1,
              },
            ],
            start_date: subscriptionSchedule.current_phase?.start_date,
            end_date: subscriptionSchedule.current_phase?.end_date,
            coupon: Number(upcomingSubWpId) === annualSubWP ? (coupon == null ? "NEWANNUAL" : coupon) : Number(upcomingSubWpId) === monthlySubWP ? (coupon == null ? "NEWMONTHLY" : coupon) : coupon || undefined,
          },
          {
            items: [
              {
                price: priceData.id,
                quantity: 1,
              },
            ],
            coupon: Number(upcomingSubWpId) === annualSubWP ? (coupon == null ? "NEWANNUAL" : coupon) : Number(upcomingSubWpId) === monthlySubWP ? (coupon == null ? "NEWMONTHLY" : coupon) : coupon || undefined,
            start_date: formatWpToStripeDate(sub.subscriptionrenewson),
          },
        ],
      }
    );
    JSON.stringify(updateSubscriptionSchedule)
  }
};
