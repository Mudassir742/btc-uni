import Stripe from "stripe";
import { z } from "zod";

export enum PurchaseType {
  "subscription" = "subscription",
  "one-time" = "one-time",
}
export const paymentIntentSchema = z.object({
  customerId: z.string(),
  amount: z.number(),
  paymentMethodId: z.string().optional(),
  customerName: z.string(),
  quantity: z.number().max(20, { message: "Quantity should be less than 20" }),
  counponData: z
    .object({
      type: z.string(),
      value: z.number(),
    })
    .optional(),
  isGift: z.boolean().optional(),
  productId: z.string(),
  giftData: z
    .object({
      recipientEmail: z.string(),
      message: z.string().optional(),
    })
    .optional(),
  purchaseType: z.nativeEnum(PurchaseType),
});
// .superRefine((values, ctx) => {
//   switch (true) {
//     case values["isGift"]:
//       ctx.addIssue({
//         message: "Email is required",
//         code: z.ZodIssueCode.custom,
//         path: ["giftData.recipientEmail"],
//       });
//   }
// });

//  Setup Intent Schema
export const setupIntentSchema = z.object({
  customerId: z.string(),
  metaData: z.object({
    productId: z.string(),
    "wp-id": z.string(),
  }).optional(),
  couponId: z.string().optional(),
});

export type ISetupIntentSchema = z.infer<typeof setupIntentSchema>;
export type IPaymentIntentSchema = z.infer<typeof paymentIntentSchema>;
