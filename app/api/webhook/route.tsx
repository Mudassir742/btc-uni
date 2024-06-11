import { NextRequest } from "next/server";
import Stripe from "stripe";
// Lib
import { createCouponCode } from "@/lib/services/stripe/handleCouponCode";
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";
import { PurchaseType } from "@/lib/schemas/paymentIntentSchema";
import { updateCustomerONWordpress } from "./events/updateCustomerOnWordpress";
import { cancelSubscription } from "./events/cancelSubscription";
import { createInvoiceWithCustomDetails } from "@/lib/services/actions/createInvoice";

type IMetadata = {
  message?: string;
  recipitentEmail?: string;
  isGift: string;
  stripeProductId: string;
  purchaseType: PurchaseType;
};



export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const buf = await req.text();

  const sig = req.headers.get("stripe-signature") as string | string[]; // t=1679...,v1=888050e17...,v0=cc9b94a...

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    if (event.type === "customer.updated") {
      // Stripe Object
      const stripeObject: Stripe.Customer = event.data
        .object as Stripe.Customer;
      console.log("🧑 Customer Webhook Called!");

      // await updateCustomerONWordpress(stripeObject);
    } else if (event.type === "payment_intent.succeeded") {
      // Create invoice for the single product trasaction
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;

      const metadata = stripeObject.metadata as {
        purchaseType: "bundle" | "course"
      };

      if (metadata.purchaseType === "bundle" || metadata.purchaseType === "course") {
        const customerId = stripeObject.customer as string
        await createInvoiceWithCustomDetails(customerId, "", [
          {
            description: stripeObject.description!,
            amount: stripeObject.amount, // Amount in cents
            metadata: {
              paymentIntent: stripeObject.id,
            },
          },
          // ... other items
        ])

      }

    }
    else if (event.type === "invoice.upcoming") {

    }
    else if (event.type === "customer.subscription.deleted") {
      const stripeObject: Stripe.Subscription = event.data
        .object as Stripe.Subscription;

      await cancelSubscription(stripeObject);

    }
    else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    return new Response(`Successful Webhook`);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      });
    } else {
      return new Response(`Webhook error: ${error}`, {
        status: 400,
      });
    }
  }
}
