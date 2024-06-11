import Stripe from "stripe";
// Lib
import {
  IPaymentIntentSchema,
  ISetupIntentSchema,
  PurchaseType,
} from "@/lib/schemas/paymentIntentSchema";
import {
  CheckoutProductsFormSchema,
  CheckoutSubscriptionFormSchema,
} from "@/lib/schemas/checkoutFormSchema";

/**
 * Creates a payment intent.
 *
 * @param {number} amount - The payment amount.
 * @param {string} customerId - The customer's ID.
 * @param {CheckoutSubscriptionFormSchema | CheckoutProductsFormSchema} values - Form values.
 * @param {string} productId - The product's ID.
 * @param {Object} counponData - Coupon data.
 * @param {string} counponData.type - The type of the coupon ('percent' or 'amount').
 * @param {number} counponData.value - The value of the coupon.
 * @param {PurchaseType} purchaseType - The type of purchase.
 * @param {number} quantity - The quantity.
 * @param {string} [PaymentMethod] - The optional payment method.
 *
 * @returns {Promise<Stripe.Response<Stripe.PaymentIntent>>} A promise that resolves with the Stripe PaymentIntent.
 */
export const createPaymentIntent = async ({
  amount,
  customerId,
  customerName,
  values,
  productId,
  counponData,
  purchaseType,
  quantity,
  PaymentMethod,
  customerEmail
}: {
  amount: number,
  customerId: string,
  customerName:string
  customerEmail: string,
  values: CheckoutSubscriptionFormSchema | CheckoutProductsFormSchema,
  productId: string,
  counponData: {
    type: "percent" | "amount";
    value: number;
  },
  purchaseType: PurchaseType,
  quantity: number,
  PaymentMethod?: string,
}) => {
  try {
    const response = await fetch("/api/payment-intent", {
      method: "POST",
      mode: "same-origin",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
      body: JSON.stringify({
        customerName: customerName,
        amount: amount,
        customerId: customerId,
        paymentMethodId: PaymentMethod,
        counponData,
        isGift: values.forAnotherUser,
        productId: productId,
        quantity,
        description: `Bulk Subscription purchase of ${quantity}`,
        giftData: values.forAnotherUser
          ? {
            recipientEmail: customerEmail,
            message: values["message"],
          }
          : undefined,
        purchaseType: purchaseType,
      } as IPaymentIntentSchema),
    });

    const paymentIntent = await response.json();

    if (!response.ok) {
      throw paymentIntent;
    }
    const cus = paymentIntent as Stripe.Response<Stripe.PaymentIntent>;
    if (!cus?.client_secret) {
      throw new Error("No client secret");
    }

    return cus;
  } catch (error) {
    throw error;
  }
};

// Setup Payment Intent
export const setupPaymentIntent = async ({
  customerId,
  metaData,
  couponId,
}: ISetupIntentSchema) => {
  try {
    const response = await fetch("/api/payment-intent/setup-intent", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
      mode: "same-origin",
      body: JSON.stringify({
        customerId: customerId,
        metaData: metaData,
        couponId: couponId,
      } as ISetupIntentSchema),
    });

    const paymentIntent = await response.json();

    if (!response.ok) {
      throw paymentIntent;
    }
    const cus = paymentIntent as Stripe.Response<Stripe.SetupIntent>;
    if (!cus?.client_secret) {
      throw new Error("No client secret");
    }

    return cus;
  } catch (error) {
    throw error;
  }
};
