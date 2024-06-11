import { z } from "zod";

export const customerSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  email: z.string().email({ message: "Invalid email" }),
  paymentMethodId: z.string().optional(),
  address: z.object({
    country: z.string(),
    city: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    state: z.string(),
    postal_code: z.string(),
  }),
});
export const updateCustomerSchema = z.object({
  cus_id: z.string(),
  address: z.object({
    country: z.string().optional(),
    city: z.string().optional(),
    line1: z.string().optional(),
    line2: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
  }),
});


export type CustomerSchema = z.infer<typeof customerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;