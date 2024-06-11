import { NextRequest, NextResponse } from "next/server";
// Stripe
import { PaymentIntent } from "@stripe/stripe-js";
import Stripe from "stripe";
import { subscriptionSchema } from "@/lib/schemas/createSubscriptionSchema";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  // downgraded from 2022-11-15
});

export const POST = async (request: NextRequest) => {
  const req: { customerId: string; productData: Stripe.Product } =
    await request.json();
  const validPayload = subscriptionSchema.parse(req);
  console.log(validPayload.metadata);

  try {
    const subscription = await stripe.subscriptions.create({
      customer: validPayload.customerId,

      default_payment_method: validPayload.existingCardId || undefined,
      payment_behavior: "default_incomplete",
      cancel_at_period_end: validPayload.isGiftedBySomeone ? true : false,
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        "wp-id": validPayload.metadata["wp-id"],
        "recipient-email": validPayload.metadata["recipient-email"] ?? null,
        message: validPayload.metadata["message"] ?? null,
        userData: validPayload.metadata["userData"],
      },
      coupon: validPayload.couponCode,
      items: [
        {
          price_data: {
            tax_behavior: "exclusive",
            product: validPayload.productId,
            unit_amount: validPayload.unit_amount,
            recurring: {
              interval: validPayload.recurring.interval,
              interval_count: validPayload.recurring?.interval_count,
            },
            currency: "usd",
          },
        },
      ],
      expand: ["latest_invoice.payment_intent"],
    });

    if (subscription.pending_setup_intent && validPayload.isGiftedBySomeone) {
      // Set setup payment intent metadata
      const res = await stripe.setupIntents.update(
        subscription.pending_setup_intent as string,
        {
          metadata: {
            "wp-id": validPayload.metadata["wp-id"],
          },
        }
      );
    }

    const pIntent = subscription.latest_invoice as {
      payment_intent: PaymentIntent;
    };
    return NextResponse.json({
      ...subscription,

      paymentIntent: pIntent.payment_intent,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error },
        {
          status: 400,
        }
      );
    }
    return new NextResponse("Failed to create the customer", {
      status: 500,
    });
  }
};
