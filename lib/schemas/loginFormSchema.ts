import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .refine(
      (val) => {
        return val !== "";
      },
      { message: "Email is required" }
    ),
  password: z.string().refine(
    (val) => {
      return val !== "";
    },
    { message: "Password is required" }
  ),
  rememberMe: z.boolean().default(false),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
