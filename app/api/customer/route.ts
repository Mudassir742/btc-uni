import { NextRequest, NextResponse } from "next/server";
// Zod
import * as zod from "zod";
import { z } from "zod";
import { customerSchema, updateCustomerSchema } from "@/lib/schemas/createCustomerSchema";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const customerId = req.searchParams.get("customerId");
  try {
    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId);

      return NextResponse.json(customer);
    } else {
      throw new Error("No customer id provided");
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error });
    }
    return new NextResponse("Failed to create the customer");
  }
};

export const POST = async (request: NextRequest) => {
  const req: { paymentMethodId: string } = await request.json();
  // Zod input field validation
  const validPayload = customerSchema.parse(req);
  try {
    const customer = await stripe.customers.create({
      email: validPayload.email,

      address: {
        ...validPayload.address,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error });
    } else if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error });
    } else if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error });
    } else {
      return new NextResponse("Internal Server Error");
    }
  }
};

export const PATCH = async (request: NextRequest) => {
  const req: { paymentMethodId: string } = await request.json().catch(() => "Invalid Json");
  // Zod input field validation
  const validPayload = updateCustomerSchema.parse(req);
  try {
    const customer = await stripe.customers.update(validPayload.cus_id, {
      address: {
        ...validPayload.address
      }
    });

    return NextResponse.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error });
    } else if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error });
    } else if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error });
    } else {
      return new NextResponse("Internal Server Error");
    }
  }
};
