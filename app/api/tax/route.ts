import { NextRequest, NextResponse } from "next/server";
// Zod
import * as zod from "zod";
import { z } from "zod";
import { calcSubscriptionSchema } from "@/lib/schemas/calcTaxSchema";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";

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
  const validPayload = calcSubscriptionSchema.parse(req);
  try {
    const tax = await stripe.tax.calculations.create({
      customer: validPayload.customerId,
      currency: "usd",
      line_items: validPayload.items.map((item, i) => {
        return {
          amount: item.amount,
          reference: `ref_${i}`,
          product: item.product,
        };
      }),
    });

    return NextResponse.json(tax);
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
