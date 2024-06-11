import { NextRequest, NextResponse } from "next/server";
// Zod
import { z } from "zod";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";
import {
  paymentIntentSchema,
  setupIntentSchema,
} from "@/lib/schemas/paymentIntentSchema";

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
  const validPayload = setupIntentSchema.parse(req);

  try {
    const intent = await stripe.setupIntents.create({
      customer: validPayload.customerId,
      metadata: {
        ...validPayload.metaData,
      },
    });

    if (intent && validPayload.couponId) {
      await stripe.coupons.del(validPayload.couponId);
    }
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
