// Note: Stripe API FOR COUPON CODES: https://stripe.com/docs/api/coupons

import { NextRequest, NextResponse } from "next/server";
// Zod
import { z } from "zod";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";
import { randomUUID } from "crypto";
import { handleError } from "@/utils/stripeErrorHandling";

export const createCouponCode = async ({
  percent_off,
  product_id,
  type,
  coupon_code_for,
}: {
  percent_off: number;
  product_id: string;
  type: "gift" | "discount";
  coupon_code_for: string;
}) => {
  try {
    const intent = await stripe.coupons.create({
      percent_off: percent_off,
      applies_to: {
        products: [product_id],
      },
      max_redemptions: 1,
      metadata: {
        coupon_code_for: coupon_code_for,
        type: type,
      },
    });

    return intent;
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
export const getCouponData = async (couponId?: string) => {
  try {
    if (!couponId) return null;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/coupon?couponId=${couponId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    handleError(error);
  }
};
