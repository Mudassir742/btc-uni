import { ICurrentUserSub } from "@/features/stripe/subscriptions";
import Stripe from "stripe";

export const getCurrentStripeSub = (
  subs: Stripe.Product[],
  currentSub: ICurrentUserSub
): Stripe.Product => {
  const filteredSub = subs.find((sub) => {
    const meta = sub.metadata as { type: string; "wp-id": string };
    const planId = currentSub.subscriptionMetadata.subscriptiontype?.databaseId;
    if (currentSub.subscriptionMetadata.upcomingsubscriptionid) {
      return (
        currentSub.subscriptionMetadata.upcomingsubscriptionid === meta["wp-id"]
      );
    }
    return String(planId) === meta["wp-id"];
  });

  return filteredSub!;
};

export const isAnnualSub = (sub: Stripe.Product) => {
  const price = sub.default_price as Stripe.Price;
  return price.recurring?.interval === "year";
};

export const category = [
  {
    name: "View Certificates",
    link: "view-certificates",
  },
  {
    name: "Update Subscription",
    link: "update-subscription",
  },
  {
    name: "My Info",
    link: "my-info",
  },
  {
    name: "Payment Info",
    link: "payment-info",
  },
  {
    name: "Change Password",
    link: "change-password",
  },
  {
    name: "Customer Support",
    link: "customer-support",
  },
];
