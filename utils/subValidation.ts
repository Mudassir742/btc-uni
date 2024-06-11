import { ICurrentUserSub } from "@/features/stripe/subscriptions";
import { Subscription } from "@/interfaces";

// jan 25 logic update by Mihai
// we have 3 cases of sub.subscriptionMetadata.paymentStatus: 
//              1. "incomplete" when payment fails --> these users should NOT HAVE access
//              2. "active" when payment is successful --> these users should HAVE access
//              3. "null" for data imported from TI --> these users should HAVE access
//              4. "UNKNOWN STRING" for when there other payment issues? --> these users should NOT HAVE access
// so i will update checkIsRenewable and checkIsRenewableNew so that:
//              - if null, all should be considered "active" -- for those that really arent we also check expiration date so it doesnt matter
//              - accordingly, besides existing date check, sub.subscriptionMetadata.paymentStatus should === "active"

export const checkSubIsValid = async (sub?: ICurrentUserSub) => {
  if (!sub) {
    return false;
  }

  const isRenewable = await checkIsRenewable(
    sub?.subscriptionMetadata?.paymentStatus || null, //new jan 25
    sub?.subscriptionMetadata?.subscriptionexpireson || null,
    sub?.subscriptionMetadata?.subscriptionrenewson || null
  );

  if (!isRenewable) {
    return false;
  }

  return true;
};
export const checkSubIsCancelled = async (sub?: ICurrentUserSub) => {
  if (!sub) {
    return true;
  }

  if (sub.subscriptionMetadata.subscriptioncanceledon) {
    return true;
  }
  return false;
};

export function checkIsRenewable(
  paymentStatus: string | null, //new jan 25
  subscriptionexpireson: string | null,
  subscriptionrenewson: string | null
): boolean {
  // If the expiration date is null, it means the subscription will renew
  if (subscriptionexpireson === null) {
    return true;
  }

  // // Parse the subscription expiration date string into a Date object
  // const expirationDate = new Date(subscriptionexpireson);

  // // Get the current date and time
  // const currentDate = new Date();

  // // If the current date is past the expiration date, the subscription is not renewable (it has expired)
  // return !!subscriptionrenewson && expirationDate >= currentDate && (paymentStatus === null || paymentStatus === "active"); //new jan 25 added last condition
  // above deprecated by Mihai on Jan 30 and replaced with the same code as in checkIsRenewableNew, which is used in 90% of cases

  let expirationComparisonDate: Date = new Date;

  // Expiration date is always null for non-gift subscription, if that is the case we will compare the renewsondate
  if (subscriptionrenewson === null && subscriptionexpireson !== null) {
    expirationComparisonDate = new Date(subscriptionexpireson);
  } else if (subscriptionrenewson !== null) {
    expirationComparisonDate = new Date(subscriptionrenewson);
  } else {
    // Handle the case where both are null, if necessary
    return false; // or some other appropriate handling
  }

  // Get the current date and time
  const currentDate = new Date();

  // If the current date is past the expiration date, the subscription is not renewable (it has expired)
  return expirationComparisonDate >= currentDate && (paymentStatus === null || paymentStatus === "active" || paymentStatus === "canceled" || paymentStatus === "cancelled" || paymentStatus === "past_due"); //new jan 25 added last condition

}

export const checkSubIsValidSubscriptionObject = async (sub?: Subscription) => {
  if (!sub) {
    return false;
  }
  const isRenewable = await checkIsRenewableNew(
    sub?.subscriptionMetadata?.paymentStatus || null, //new jan 25
    sub?.subscriptionMetadata?.subscriptionexpireson || null,
    sub?.subscriptionMetadata?.subscriptionrenewson || null
  );

  if (!isRenewable) {
    return false;
  }

  return true;
};

export function checkIsRenewableNew(
  paymentStatus: string | null, //new jan 25
  subscriptionexpireson: string | null,
  subscriptionrenewson: string | null
): boolean {

  let expirationComparisonDate: Date = new Date;

  // Expiration date is always null for non-gift subscription, if that is the case we will compare the renewsondate
  if (subscriptionrenewson === null && subscriptionexpireson !== null) {
    expirationComparisonDate = new Date(subscriptionexpireson);
  } else if (subscriptionrenewson !== null) {
    expirationComparisonDate = new Date(subscriptionrenewson);
  } else {
    // Handle the case where both are null, if necessary
    return false; // or some other appropriate handling
  }

  // Get the current date and time
  const currentDate = new Date();

  // If the current date is past the expiration date, the subscription is not renewable (it has expired)
  return expirationComparisonDate >= currentDate && (paymentStatus === null || paymentStatus === "active" || paymentStatus === "canceled" || paymentStatus === "cancelled" || paymentStatus === "past_due"); //new jan 25 added last condition
}