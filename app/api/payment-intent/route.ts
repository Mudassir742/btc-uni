import { NextRequest, NextResponse } from "next/server";
// Zod
import { z } from "zod";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";
import { paymentIntentSchema } from "@/lib/schemas/paymentIntentSchema";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  const req = await request.json().catch((error) =>
    NextResponse.json(
      { ...error },
      {
        status: 400,
      }
    )
  );
  const validPayload = paymentIntentSchema.parse(req);

  try {
    const intent = await stripe.paymentIntents.create({
      customer: validPayload.customerId,
      currency: "usd",
      amount:
        validPayload.amount -
        (validPayload.counponData?.type === "percent"
          ? validPayload.amount * (validPayload.counponData?.value / 100)
          : validPayload.counponData?.value ?? 0),
      payment_method_types: ["card"],
      setup_future_usage: validPayload.isGift && validPayload.purchaseType === "subscription" ? "off_session" : undefined,
      payment_method: validPayload.paymentMethodId || undefined,
      description: `${validPayload.quantity > 1 ? `Yearly Subscription - Bulk Purchase (${validPayload.quantity} Coupon Codes)` : "Yearly Subscription - Single Purchase (1 Coupon Code)"}`,
      metadata: {
        quantity: validPayload.quantity,
        purchaseType: validPayload.purchaseType,
        productId: validPayload.productId,
        isGift: String(validPayload.isGift),
        name: validPayload.customerName,
        recipitentEmail: validPayload.giftData
          ? validPayload.giftData.recipientEmail
          : null,
        message: validPayload.giftData?.message
          ? validPayload.giftData.message
          : null,
      },
    });

    // const intent = await stripe.setupIntents.create({
    //   customer: validPayload.customerId,
    // });

    return NextResponse.json(intent);
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ...error },
        {
          status: 400,
        }
      );
    } else if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { ...error },
        {
          status: 400,
        }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(error, {
        status: 400,
      });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
