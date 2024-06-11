import * as z from "zod";

export const signupFormSchema = z.object({
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

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
