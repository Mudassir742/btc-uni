import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$£€%^&*()\-_=+{}[\]|\\:;"'<>,.?/~`~`])[\w!@#$£€%^&*()\-_=+{}[\]|\\:;"'<>,.?/~`~`]{8,}$/, {
        message: "Password should contain at least one lowercase letter, one uppercase letter, one special character and one digit",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });;

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;
