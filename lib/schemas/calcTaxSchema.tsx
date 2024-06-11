import Stripe from "stripe";
import { z } from "zod";
export const calcSubscriptionSchema = z.object({
  customerId: z.string(),
  items: z.array(
    z.object({
      product: z.string(),
      amount: z.number(),
    })
  ),
});


export type ICalcSubscriptionSchema = z.infer<typeof calcSubscriptionSchema>;