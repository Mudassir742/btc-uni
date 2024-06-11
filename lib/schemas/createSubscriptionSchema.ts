import Stripe from "stripe";
import { z } from "zod";
export const subscriptionSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  customerId: z.string(),
  productId: z.string(),
  unit_amount: z.number(),
  recurring: z.object({
    interval_count: z.number(),
    interval: z.custom(),
  }),
  metadata: z.object({
    "wp-id": z.string(),
    "recipient-email": z.string().optional(),
    message: z.string().optional(),
    userData: z.string(),
    // userID: z.string(),
    // userDataId: z.string(),
  }),
  isAGift: z.boolean().optional(),
  activateImmediately: z.boolean(),
  activationDate: z.number().optional(),
  couponCode: z.string().optional(),
  existingCardId: z.string().optional(),
  isGiftedBySomeone: z.boolean().optional(),
});
