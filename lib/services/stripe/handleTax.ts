import Stripe from "stripe";
import { z } from "zod";
// Lib
import { formSchema } from "@/lib/schemas/checkoutFormSchema";
import { CheckoutSubscriptionFormSchema } from "@/lib/schemas/checkoutFormSchema";
import useSWR from "swr";
import { UseFormReturn } from "react-hook-form";
import { ICalcSubscriptionSchema } from "@/lib/schemas/calcTaxSchema";

const fetcher = (
  url: string,
  productData: { amount: number; product: string }[],
  customerId?: string
) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(<ICalcSubscriptionSchema>{
      customerId: customerId,
      items: productData,
    }),
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
};

export const useTax = (
  productData: { amount: number; product: string }[],
  customerId?: string,
  IsAGift?: boolean
) => {
  // Pass form to fetcher
  const { data, error, isLoading, mutate } = useSWR(
    productData.length && !IsAGift ? `/api/tax/` : null,
    (url) => fetcher(url, productData, customerId),
    {
      revalidateOnFocus: false,
    }
  );

  if (data?.type === "StripeInvalidRequestError") {
    return {
      taxData: null,
      isLoading,
      isError: error,
      refetch: mutate,
    };
  }

  return {
    taxData: typeof data === "string" ? null : data as Stripe.Tax.Calculation | null,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
