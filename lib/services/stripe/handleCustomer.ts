import Stripe from "stripe";
import { z } from "zod";
// Lib
import {
  CheckoutProductsFormSchema,
  CheckoutSubscriptionFormSchema,
  formSchema,
} from "@/lib/schemas/checkoutFormSchema";
import { CustomerSchema, UpdateCustomerSchema } from "@/lib/schemas/createCustomerSchema";
import { BasicFormInfo } from "@/lib/schemas/basicInfoForm";

export const createCustomer = async (
  values: any & {
    email: string;
  }
) => {
  try {
    const response = await fetch("/api/customer", {
      method: "POST",
      mode: "same-origin",
      headers:{
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
      body: JSON.stringify({
        email: values.email,
        address: {
          city: values.city,
          country: values.country,
          line1: values.address1,
          line2: values.address2,
          postal_code: values.zipcode,
          state: values.state,
        },
      } as CustomerSchema),
    });

    const customer = await response.json();

    if (!response.ok) {
      throw customer;
    }
    return customer as Stripe.Response<Stripe.Customer>;
  } catch (error) {
    throw error;
  }
};
export const updateCustomer = async (
  values: BasicFormInfo,
  customerId: string
) => {
  try {
    const response = await fetch("/api/customer", {
      method: "PATCH",
      mode: "same-origin",
      headers:{
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
      body: JSON.stringify({
        cus_id: customerId,
        address: {
          city: values.city,
          country: values.country,
          line1: values.address1,
          line2: values.address2,
          postal_code: values.zipcode,
          state: values.state,
        },
      } as UpdateCustomerSchema),
    });

    const customer = await response.json();

    if (!response.ok) {
      throw customer;
    }
    return customer as Stripe.Response<Stripe.Customer>;
  } catch (error) {
    throw error;
  }
};
