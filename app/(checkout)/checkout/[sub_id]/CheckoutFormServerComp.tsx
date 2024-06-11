// Components
import CheckoutSubForm from "@/components/forms/CheckoutSubForm";
import StripeWrapper from "@/components/forms/StripeWrapper";
// Lib
import Stripe from "stripe";
// stripe
import { stripe } from "@/lib/stripe-server";
// Utils
import { handleError } from "@/utils/stripeErrorHandling";
import { notFound, redirect } from "next/navigation";
import { getCouponData } from "@/lib/services/stripe/handleCouponCode";
import { FC, HTMLAttributes, Suspense } from "react";
import { cn } from "@/utils/shadcn";
import { UserSession } from "@/interfaces";
import { getStripeSubById } from "@/features/stripe/subscriptions";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  searchParams: { couponId?: string; planId?: string };
  subscriptionId: string,
  userSession: UserSession;
}

export const getCustomerCardInfo = async (customerId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/customer-card?customerId=${customerId}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    handleError(error);
  }
};

const getCustomerInfo = async (customerId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/customer?customerId=${customerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    handleError(error);
  }
};

const CheckoutFormServerComp: FC<IProps> = async ({
  className,
  searchParams,
  userSession,
  subscriptionId,
  ...props
}) => {
  // Get Subscription Data
  const pDataPromise = getStripeSubById(subscriptionId);
  // Get Customer Cards Data
  const cusCardDataPromise: Promise<
    Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>
  > = getCustomerCardInfo(userSession.stripe.cus_id);

  // Get Customer Data
  const cusDataPromise: Promise<Stripe.Customer> = getCustomerInfo(
    userSession.stripe.cus_id
  );


  // Get coupon Data if any
  const couponPromise: Promise<Stripe.Coupon> = getCouponData(
    searchParams.couponId
  );
  try {

    const [pData, cusData, cusCardData, couponData] = await Promise.all([
      pDataPromise,
      cusDataPromise,
      cusCardDataPromise,
      couponPromise,
    ])
    // Redirect the user if invalid coupon id
    if (couponData && ("raw" in couponData || !couponData?.valid)) {
      // (window as any).dataLayer.push({
      //   event: "purchase",
  
      //   itemName: "subscription",
      //   userStripeId: cusData?.id,
      //   userDataId: userSession?.userDataId,
      //   userEmail: cusData?.email,
      //   userPhone: cusData?.phone,
      //   userName: cusData?.name,
      //   userCity: cusData?.address?.city,
      //   userState: cusData?.address?.state,

      //   purchaseType: pData?.type,
      //   stripeProductId: pData?.id,
      //   // You can add any other relevant data here

      //   finalValue: Number(pData?.metadata?.finalValue),
      //   currency: "USD",

      // });
      // Mihai may 15: above deprecated and moved back to SingleSubscription component on welcome page
      redirect(`${process.env.NEXT_PUBLIC_SITE_URL}`);
    } else if (!pData) {
      notFound()
    }




    return (
      <div className={cn("", className)} {...props}>
        {pData && (
          <Suspense>
            <CheckoutSubForm
              user={userSession}
              customerData={cusData && cusData}
              cusCardData={cusCardData.data}
              pData={{ ...pData }}
              couponData={couponData}
              planId={subscriptionId}
            />
          </Suspense>
        )}
      </div>
    );
  } catch (err) {
    notFound()
  }

};

export default CheckoutFormServerComp;