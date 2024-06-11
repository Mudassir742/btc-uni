"use client";
// Components
import CheckoutForm from "@/components/forms/CheckoutSubForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> { }
export default function StripeWrapper({ children }: IProps) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  return (
    // <div className="rounded-md">

    // </div>
    <Elements

      options={{
        mode: "subscription",
        currency: "usd",
        amount: 0,
        paymentMethodTypes: ["card"],
        paymentMethodCreation: "manual",
        appearance: {
          labels: "floating",
          variables: {},
          rules: {
            ".Input": {
              padding: "0.5rem 1rem",
              // padding: "1.2rem ",
              borderRadius: "0.375rem",
              border: "1px solid rgba(32, 32, 32, 0.40)",
            },
            ".Label": {
              color: "rgba(32, 32, 32, 0.40)",
              fontWeight: "500",
              fontSize: "0.9375rem",
              // marginBottom: "0.7rem",
            },
          },
        },
      }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}
