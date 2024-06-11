'use server'
import { cookies } from "next/headers";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { ICurrentUserSub } from "../subscriptions";
import { CANCEL_SUBSCRIPTION } from "@/graphql/mutations";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { formaToWptDate } from "@/utils/formatDate";


/**
 * Cancels a WordPress subscription for the current user.
 * @param subData - The subscription data for the current user.
 * @param reason - The reason for cancelling the subscription.
 * @returns The ID of the cancelled subscription.
 */
export const undoCancelWpSubscription = async (subData: ICurrentUserSub, reason: string) => {
  const user = await getRequestCookie(cookies());
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user?.authToken}`

    },
    // cache: "force-cache",
    body: JSON.stringify({
      query: CANCEL_SUBSCRIPTION.loc?.source.body,
      variables: {
        "input": {
          "id": subData.databaseId,
          "subscriptionMetadata": {
            "subscriptionCanceledOn": "",
            "subscriptionExpiresOn": subData?.subscriptionMetadata?.subscriptionrenewson??undefined,
            "subscriptionRenewsOn": subData?.subscriptionMetadata?.subscriptionrenewson??undefined,
            "subscriptionCancelationReason": reason
          }
        }
      }
    }),
  })

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors)
  }

  const subsData = data as {
    subscription: {
      databaseId: number
    }
  };
  return subsData.subscription?.databaseId;
}


