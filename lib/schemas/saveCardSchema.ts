import { z } from "zod";

export const saveCardSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  email: z.string().email({ message: "Invalid email" }),
  paymentMethodId: z.string().optional(),
});