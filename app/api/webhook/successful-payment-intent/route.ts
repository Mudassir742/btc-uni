import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const mailchimpTx = require("@mailchimp/mailchimp_transactional")(
  process.env.TRANSACTIONAL_EMAIL_API_KEY
);
// Lib
import { createCouponCode } from "@/lib/services/stripe/handleCouponCode";
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";
import { PurchaseType } from "@/lib/schemas/paymentIntentSchema";
import { transformWpUrl } from "@/utils/url";
import { createHash } from "crypto";

type IMetadata = {
  message?: string;
  recipitentEmail?: string;
  isGift: string;
  quantity: string;
  stripeProductId: string;
  type: PurchaseType;
  name: string;
  userWpData?: string;
};

// Create an html email template with the coupon code note that it is a gift and sent by someone

export async function POST(req: NextRequest) {
  // const webhookSecret = process.env.STRIPE_PAYMENT_INTENT_WEBHOOK_SECRET!;
  // const buf = await req.text();

  // const sig = req.headers.get("stripe-signature") as string | string[]; // t=1679...,v1=888050e17...,v0=cc9b94a...

  let event;
  try {
    // event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    event = await req.json();

    if (event.type === "payment_intent.succeeded") {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
      // Metatdata
      const metadata = stripeObject.metadata as Stripe.Metadata & IMetadata;
      // Send an email if the purchase is a gift
      if (metadata?.isGift && JSON.parse(metadata?.isGift)) {
        console.log(`Generating ${metadata.quantity} coupon codes`);
        // Coupon Code created If it's a gift
        console.log("Creating Coupon Code");

        let res: Stripe.Response<Stripe.Coupon> | NextResponse<unknown> | null =
          null;

        const couponCodes: string[] = [];

        // Createing Coupon on stripe
        for (let i = 1; i <= Number(metadata?.quantity); i++) {
          res = await createCouponCode({
            product_id: metadata.productId,
            type: "gift",
            coupon_code_for: metadata.recipitentEmail!,
            percent_off: 100,
          });
          if (!(res instanceof Stripe.errors.StripeAPIError)) {
            const couponData = res as Stripe.Coupon;
            couponCodes.push(couponData.id);
          } else {
            handleError(res);
            break;
          }
        }

        // Create a condition to check if res is a Stripe.Coupon
        if (!(res instanceof Stripe.errors.StripeAPIError)) {
          console.log("Coupon Code: ", couponCodes);

          const res = await sendEmail(
            metadata.recipitentEmail!,
            couponCodes,
            metadata.name
          );
          console.log("Email Response:", res);

          if (res[0].status === "error" || res[0].status === "rejected") {
            throw new Error("Email not sent");
          }
        } else {
          handleError(res);
        }
      } else if (metadata.type === PurchaseType["one-time"]) {
        // If one time subscription then add mailchimp tag
        const userEmail = JSON.parse(metadata.userWpData!).email;
        const courseName = stripeObject.description;
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const listId = "e616551742";
        const serverPrefix = apiKey?.split("-")[1];

        // Convert email to lowercase and hash it in MD5 format
        const subscriberHash = createHash("md5")
          .update(userEmail)
          .digest("hex");
        // Mailchimp API URL
        const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}/tags`;

        // Data to send in the request
        const data = {
          tags: [{ name: courseName, status: "active" }],
        };

        // Make the API call
        await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log(response);
            console.log("Tag Added Successfully");
          })
          .catch((err) => console.error("Error:", err));
      }
    } else if (event.type === "setup_intent.created") {
      // For gift subscriptions
      const stripeObject: Stripe.SetupIntent = event.data
        .object as Stripe.SetupIntent;

      try {
        // Get Fresh Metadata
        const metaData = (await stripe.setupIntents.retrieve(stripeObject.id))
          .metadata as Stripe.Metadata & { "wp-id": string };
        metaData;
      } catch (error) {
        handleError(error);
      }
      // Setting up an Intent
    } else if (event.type === "customer.subscription.created") {
      const stripeObject: Stripe.Subscription = event.data
        .object as Stripe.Subscription;
      try {
        console.log("Subscription Created", stripeObject);
      } catch (error) {
        handleError(error);
      }
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }
    console.log("Successful");
    return NextResponse.json(`Successful Webhook`);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`Webhook error: ${error.message}`, {
        status: 400,
      });
    } else {
      return NextResponse.json(`Webhook error: ${error}`, {
        status: 400,
      });
    }
  }
}

const sendEmail = async (
  recipientEmail: string,
  codes: string[],
  name: string
) => {
  const promoCodeHeading =
    codes.length === 1
      ? "Your exclusive promo codes:"
      : "Your exclusive promo codes:";
  const themecolor = "#523D34";
  const s = codes.length === 1 ? "" : "s";

  // jan 22 - to add back  transformWpUrl func below TO DO
  const htmlContent = `
  <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
   <p style="text-align:left;">
       <img src="https://cms.btcuniversity.com/wp-content/uploads/2023/03/btcuniversity-logotype-black.png" alt="BTC University Logo" style="width:40%;"></p>


</p>     
     
           <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Hi ${name},</p>
            <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Thank you for spreading the gift of knowledge with BTC University subscription${s}!</p>
          <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Share the promo code${s} below with the people you’d like to gift the subscription${s} to, and they will be able to enjoy one free year of BTC University.</p>
          <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">How to redeem: (there are two ways to redeem a gift subscription) </p>

   <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">1) The recipient can go <a href="https://www.btcuniversity.com/subscribe?isGift=true">HERE,</a>
 click "Claim your gift" at the bottom and follow the prompts to make an account and redeem their promo code.</p>
           <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Or </p>

           <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">#2) Use the promo code during checkout, when purchasing a annual subscription. 
</p>

          
           <p style="font-size:16px; margin-top:10px; margin-bottom:10px;"> While your promo code${s} do not expire, please note that each one is good for one subscription. If you are gifting multiple subscriptions, each recipient will have their own promo code.</p>
            <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Should you or your gifted subscription recipient${s} have any questions or need assistance with the process, please don’t hesitate to reach out to our dedicated support team at membership@btcuniversity.com.</p>
            <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Thanks for being a part of the BTC-U community!</p>
           <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">BTC University Team</p>

<p style="font-size:16px; margin-top:10px;  color: #523D34;"><strong>${promoCodeHeading}</strong></p>

      <ul style="list-style-type: none; padding: 0;">
          ${codes
            .map(
              (code) =>
                `<li style="margin-bottom: 10px; background-color: #f2f2f2; padding: 10px; border-radius: 4px;">${code}</li>`
            )
            .join("")}
      </ul>
  
  </div>
`;

  const message = {
    from_email: "membership@btcuniversity.com",
    subject: "BTC University Subscription Gift",
    text: `Your exclusive promo codes:\n${codes.join("\n")}`,
    html: htmlContent,
    to: [
      {
        email: recipientEmail,
        type: "to",
      },
    ],
  };
  const response = await mailchimpTx.messages.send({
    message,
  });

  return response;
};
