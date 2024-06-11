// Utils
import { Suspense } from "react";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
// Components
import Loader from "@/components/ui/Loader";
import StripeWrapper from "@/components/forms/StripeWrapper";
// import CheckoutFormServerComp from "./CheckoutFormServerComp";
import {
  BlackWhiteGridLeftContent,
  BlackWhiteGridRightContent,
  BlackWhiteGridWrapper,
} from "@/components/wrapper/BlackWhiteGridWrapper";
import SH1Text from "@/components/text/SH1Text";

import CheckoutFormServerComp from "./CheckoutFormServerComp";
import { stripe } from "@/lib/stripe-server";
import { getProfile } from "@/features/wp/user";
import { ICurrentUserSub, getCustomerSubs, getStripeSubs } from "@/features/stripe/subscriptions";
import { QueryClient } from "@tanstack/react-query";
import { hasDatePassed } from "@/utils/formatDate";

export const dynamic = "force-dynamic";

export default async function SubscriptionCheckout({
  params,
  searchParams,
}: {
  params: {
    sub_id: string;

  };
  searchParams: { couponId?: string, qty?: string };
}) {
  const session = await headers().get("auth-session");
  const queryClient = new QueryClient();


  const user = await getRequestCookie(cookies(), session!);
  if (!user?.userData?.name) {
    redirect("/basics/");
  }
  let subsDataProm = getStripeSubs();
  const userAdditionalDataProm = getProfile(user!.userData?.databaseId!);

  const [subsData, userAdditionalData] = await Promise.all([
    subsDataProm,
    userAdditionalDataProm,
    queryClient.prefetchQuery<ICurrentUserSub>({
      queryKey: ['currentWpSub', user?.userData?.databaseId!],
      queryFn: async ({ queryKey }) => {
        // Extract 'id' from queryKey
        const [_key, id] = queryKey as [string, number];
        return await getCustomerSubs(id)
      },
    }),
  ]);

  const currentCustomerSubscription = queryClient.getQueryData(['currentWpSub', user?.userData?.databaseId!]) as ICurrentUserSub;


  const subscriptionCanceledOn = currentCustomerSubscription?.subscriptionMetadata.subscriptioncanceledon ?? null;
  const renewsOn = currentCustomerSubscription?.subscriptionMetadata?.subscriptionrenewson || null;
  const paymentStatus = currentCustomerSubscription?.subscriptionMetadata?.paymentStatus || null;


  if (renewsOn !== null && !hasDatePassed(renewsOn) && (paymentStatus === "active" || !paymentStatus) && !searchParams?.qty) {
    redirect("/profile?q=update-subscription");
  }


  return (
    <main>
      <BlackWhiteGridWrapper variant="v3">
        <BlackWhiteGridLeftContent>
          {/* <div className="w-full h-full mx-auto bg-themecolor-500 relative">
           
            <BackButton className="md:block pl-0 absolute top-5 left-10 z-10" />
            <Image
              alt="background"
              src={card}
              width={1000}
              height={1000}
              className="z-0 hidden md:block object-bottom w-full"
            />
            <div className="flex flex-col gap-y-4 py-20 px-10 text-justify text-white">
              <h2 className="text-24 font-semibold">
                Thank You for Trusting Us!
              </h2>
              <h3 className="text-18 font-medium">
                Your journey with us is just beginning, and we`re grateful to
                have you on board.
              </h3>
              <p className="text-14 font-light">
                Thank you for choosing us for your needs. Your trust in our
                services means the world to us. We`re committed to providing a
                seamless experience as you proceed to checkout. Should you have
                any questions or need assistance, our team is here to help.
                Welcome to a hassle-free shopping experience with us!
              </p>
            </div>
            {/* <Image
              alt="background"
              src={welcomeImg}
              quality={100}
              fill
              className="object-cover absolute z-0 hidden md:block object-bottom w-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer("100%", "auto")
              )}`}
            /> 
          </div> */}
        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent className="container mx-auto justify-center">


          <SH1Text text="Your Order" className="!text-themeColor" />
          <div className="mt-8 lg:max-w-md">
            <StripeWrapper className="w-full">
              <Suspense fallback={<Loader />}>
                <CheckoutFormServerComp
                  subscriptionId={params.sub_id}
                  userSession={user}
                  searchParams={searchParams}
                />
              </Suspense>
            </StripeWrapper>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>
    </main>
  );
}
