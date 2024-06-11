
export const signupUser = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/signup/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({ email }),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
