import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .refine(
      (val) => {
        return val !== "";
      },
      { message: "Email is required" }
    ),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;