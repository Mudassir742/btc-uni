// Stripe
import { UserSession } from "@/interfaces";
import { formSchema } from "@/lib/schemas/checkoutFormSchema";
import { subscriptionSchema } from "@/lib/schemas/createSubscriptionSchema";
import { PaymentIntent } from "@stripe/stripe-js";
import Stripe from "stripe";
import { z } from "zod";

export const createSubscription = async (
  customer: string,
  productData: Stripe.Product,
  values: z.infer<typeof formSchema>,
  user: UserSession,
  isGiftedBySomeone: boolean = false
  // selectedCard: Stripe.PaymentMethod.BillingDetails | undefined

  // recuring: Stripe.SubscriptionCreateParams.Item.PriceData.Recurring
) => {
  const priceData = productData.default_price as Stripe.Price;
  const metadata = productData.metadata as {
    "wp-id": string;
  };

  const timestamp = values["activation-date"]?.getTime();
  // Create subscription on stripe
  try {
    const response = await fetch("/api/subscription", {
      method: "POST",
      mode: "same-origin",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
      body: JSON.stringify({
        customerId: customer,
        productId: productData.id,
        unit_amount: priceData.unit_amount,
        recurring: {
          interval: priceData.recurring?.interval,
          interval_count: priceData.recurring?.interval_count,
        },
        metadata: {
          userData: JSON.stringify({
            ...user.userData,
            ...user.stripe,
            userDataId: user.userDataId,
          }),
          // userID: String(user.userData?.databaseId),
          // userDataId: String(user.userDataId),
          "wp-id": metadata["wp-id"],
          "recipient-email": isGiftedBySomeone ? user.userData?.email : undefined,
          message: values.message,
        },
        activateImmediately: values["activate-immediately"],
        activationDate: timestamp,
        couponCode: values.couponCode,
        existingCardId: values.existingCardId,
        isGiftedBySomeone: isGiftedBySomeone,
      } as z.infer<typeof subscriptionSchema>),
    });

    const subscription:
      | (Stripe.Response<Stripe.Subscription> & {
        paymentIntent: Stripe.PaymentIntent;
      })
      | { error: Error } = await response.json();
    if ("error" in subscription) {
      throw subscription;
    }

    return subscription;
  } catch (err) {
    console.log(err);
    throw (err as { error: Stripe.errors.StripeAPIError }).error;
  }
};
