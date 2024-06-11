import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";

interface ICourse {
  post: {
    ID: number;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: "draft" | "trash" | "publish";
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
  };
  is_updated: boolean;
  price: string;
}

// const updateWpProducts = async (stripeId: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.WP_AUTH_TOKEN}`,
//         },
//         body: JSON.stringify({
//           status: "publish",
//         }),
//       }
//     );

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

const createProduct = async (body: ICourse) => {
  try {
    const res = await stripe.products.create({
      name: body.post.post_title,
      description: body.post.post_content || undefined,
      active: body.post.post_status === "draft" ? false : true,
      default_price_data: {
        currency: "usd",
        unit_amount: Number(body.price) * 100,
      },
      metadata: {
        "wp-id": body.post.ID.toString(),
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const POST = async (request: NextRequest) => {
  // Check if the product already exists in Stripe
  try {
    const body: ICourse = await request.json().catch(() => {
      throw new Error("Invalid JSON");
    });

    const stripeProduct = await stripe.products.search({
      limit: 1,
      query: `metadata["wp-id"]:"${body.post.ID}"`,
      expand: ["data.default_price"],
    });

    const stripeProductPriceIfExists = stripeProduct.data[0]
      ?.default_price as Stripe.Price;

    if (stripeProduct.data.length === 0) {
      // Create stripe product if it doesn't exist
      const res = await createProduct(body);
      return NextResponse.json(res);
    } else {
      // Update the price if needed
      let createPriceRes;
      if (stripeProductPriceIfExists.unit_amount !== Number(body.price) * 100) {
        // Inactive old price
        const priceRes = await stripe.prices.update(
          stripeProductPriceIfExists.id,
          {
            metadata: {
              active: "false",
              old_price: stripeProductPriceIfExists.unit_amount,
            },
          }
        );
        // Create new price and attach
        createPriceRes = await stripe.prices.create({
          currency: "usd",
          active: true,
          unit_amount: Number(body.price) * 100,
          product: stripeProduct.data[0].id,
        });
      }
      // Update stripe product if it exists
      await stripe.products.update(stripeProduct.data[0].id, {
        name: body.post.post_title,
        description: body.post.post_content || undefined,
        active:
          body.post.post_status === "draft" || body.post.post_status === "trash"
            ? false
            : true,
        default_price: createPriceRes?.id || stripeProductPriceIfExists.id,
        metadata: {
          "wp-id": body.post.ID.toString(),
        },
      });

      return NextResponse.json({
        message:
          body.post.post_status === "trash"
            ? "Product Deleted"
            : "Product Updated",
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Stripe.errors.StripeError) {
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
