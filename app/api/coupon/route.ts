import { NextRequest, NextResponse } from "next/server";
// Zod
import { z } from "zod";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const couponId = req.searchParams.get("couponId");
  try {
    if (couponId) {
      const coupon = await stripe.coupons.retrieve(couponId,{
        expand:["applies_to"]
      });
      return NextResponse.json(coupon);
    } else {
      throw new Error("No coupon id provided");
    }
  } catch (error) {
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
