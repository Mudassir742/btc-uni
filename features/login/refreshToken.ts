// src/features/Login/utils/refreshAuthToken.ts
import { REFRESH_TOKEN_MUTATION } from "@/graphql/mutations";
import { client } from "@/lib/apolloClient";
import { revalidateTag } from "next/cache";

export const refreshAuthToken: (
  refreshToken: string
) => Promise<string> = async (refreshToken: string) => {
  const variables = {
    refreshToken,
  };
  console.log("Refreshing Token");

  const { data } = await client.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
    variables,
  });

  // console.log("new token: ", data?.refreshToken?.authToken);
  return data?.refreshToken?.authToken ?? "";
};
