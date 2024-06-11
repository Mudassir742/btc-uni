import { LoginFormSchema } from "@/lib/schemas/loginFormSchema";

export const loginUser = async (values: LoginFormSchema) => {
  try {
    const res = await fetch(`/api/auth/login/password/`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
