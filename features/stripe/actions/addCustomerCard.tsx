"use server";
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";

// Update Customer and Attach Card
export const updateCustomerAndAttachCard = async (
  cusId: string,
  cardId: string
) => {
  try {
    const updatedCustomer = await stripe.paymentMethods.attach(cardId, {
      customer: cusId,
    });

    await stripe.customers.update(cusId, {
      invoice_settings: {
        default_payment_method: cardId,
      },
    });
    console.log("updatedCustomer", JSON.stringify(updatedCustomer));
    return JSON.stringify(updatedCustomer);
  } catch (err) {
    console.log(err);
    throw handleError(err);
  }
};
