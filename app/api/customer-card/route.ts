import { NextRequest, NextResponse } from "next/server";
// Zod
import { z } from "zod";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const customerId = req.searchParams.get("customerId");

  try {
    if (customerId) {
      const customer = await stripe.customers.listPaymentMethods(customerId, {
        type: "card",
        expand: ["data.customer.tax"],
      });
      return NextResponse.json(customer);
    } else {
      throw new Error("No customer id provided");
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
      return NextResponse.json(
        { message: error.message },
        {
          status: 400,
        }
      );
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
