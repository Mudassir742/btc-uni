"use server"
import { stripe } from "@/lib/stripe-server";

export const setDefaultCard = async (
    customerId: string,
    paymentMethodId: string
  ): Promise<void> => {
    try {
      // Use the Stripe Node.js library to update the customer's default payment method
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
  
      console.log("Default card set successfully");
    } catch (error) {
      console.error("Error setting default card:", error);
      throw error;
    }
  };
  