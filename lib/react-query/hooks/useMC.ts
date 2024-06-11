import { useMutation } from "@tanstack/react-query";

interface ISubscriberInput {
  firstName: string;
  lastName: string;
  email: string;
}
export const useMC = () => {
  const createMcSubscriber = useMutation({
    mutationFn: async (params: ISubscriberInput) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/mc/subscribe/`,
        {
          method: "POST",
          headers: {
            "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...params,
          }),
        }
      );
      return await response.json();
    },
  });

  return { createMcSubscriber };
};
