import { FC, HTMLAttributes, Suspense } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import {
  getCustomerSubs,
  getStripeSubs,
} from "@/features/stripe/subscriptions";
import { formatDateToDisplay } from "@/utils/formatDate";
import { getCurrentStripeSub, isAnnualSub } from "../helper";

// Components
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import UpdateSubscriptionAction from "@/components/forms/UpdateSubscriptionAction";
import YourPlan from "@/components/YourPlan";
import B1Text from "@/components/text/B1Text";
import CourseSubInfo from "@/components/text/CourseSubInfo";
import Stripe from "stripe";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";
// import CreditCardDetails from "@/components/cards/CreditCardDetails";

import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/ScrollArea";
import GiftRenewButton from "./GiftRenewButton";
import GiftRenewsSteps from "@/components/cards/GiftRenewsSteps";
import GiftSubscriptionRenewStep2 from "./GiftSubscriptionRenewStep2";
import SH1Text from "@/components/text/SH1Text";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  searchParams?: { [key: string]: string };
}

const UpdateSubscriptionServerComp: FC<IProps> = async ({
  className,
  searchParams,
  ...props
}) => {
  const user = await getRequestCookie(cookies());

  let subsDataProm = getStripeSubs();
  let currentCustomerSubscriptionProm = getCustomerSubs(
    user?.userData?.databaseId!
  );

  const [subsData, currentCustomerSubscription] = await Promise.all([
    subsDataProm,
    currentCustomerSubscriptionProm,
  ]);

  if (!subsData || !currentCustomerSubscription) {
    throw "Somthing went wrong";
  }

  const currentStripSub = getCurrentStripeSub(
    subsData.data,
    currentCustomerSubscription
  );

  const price = currentStripSub.default_price as Stripe.Price;

  const isGift = currentCustomerSubscription.subscriptionMetadata
    .tigiftrecipientemail
    ? true
    : false;

  return (
    <div className={cn("", className)} {...props}>
      <div >
        {/* <UpdateSubscriptionAction
          plansData={subsData.data}
          currentSub={currentCustomerSubscription ?? null}
          user={user ?? null}
        /> */}
        <SH1Text text="My Plan" className="!text-themeColor" />
        <div className='space-between-categories' />

        <div className=" border-[1px] border-border rounded-xl container bg-themecolor-50">

          <div className="flex my-6">
            <B1Text text="Member since" />
            <div className="flex flex-grow justify-end">
              <B1Text
                text={formatDateToDisplay(
                  currentCustomerSubscription.subscriptionMetadata
                    .subscriptionstartson
                )}
              />
            </div>


          </div>
          <div className="grey-line" />


          <div className="flex  mb-5">
            <B1Text text={currentStripSub.name} />
            <div className="flex flex-grow justify-end">
              <B1Text
                text={`$${(price.unit_amount! / 100).toFixed(2)}/${price.recurring?.interval
                  }`}
              />
            </div>
          </div>
          <div className="grey-line" />

          {isGift && (
            <p className="py-4 px-4 !mt-7 text-14 text-themeColor font-semibold rounded-xl bg-offgreen">
              Your subscription was gifted by someone and will expire on{" "}
              {formatDateToDisplay(
                currentCustomerSubscription.subscriptionMetadata
                  .subscriptionexpireson!
              )}{" "}
              <Dialog key={searchParams?.success ?? "update-gift-sub"}>
                <DialogTrigger asChild>
                  <button className="underline ">Enable auto renews</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="max-w-lg mt-4">
                    <Suspense
                      fallback={
                        <div>
                          <Skeleton className="w-full h-10 max-w-sm" />
                          <Skeleton className="w-full h-10 max-w-sm" />
                        </div>
                      }
                    >
                      <ScrollArea className="h-80 ">
                        {!searchParams?.step || searchParams?.step == "1" ? (
                          <GiftRenewsSteps className="!pt-5" user={user!} />
                        ) : (
                          <GiftSubscriptionRenewStep2
                            currentWpSub={currentCustomerSubscription}
                            cusId={user?.stripe.cus_id!}
                            subs={subsData.data}
                          />
                        )}
                      </ScrollArea>
                    </Suspense>
                  </div>
                  <DialogFooter>
                    <Suspense>
                      <GiftRenewButton
                        currentWpSub={currentCustomerSubscription}
                        cusId={user?.stripe.cus_id!}
                        subs={subsData.data}
                        currentStripSub={currentStripSub}
                        className="max-w-[10rem]"
                      />
                    </Suspense>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="grey-line" />

            </p>
          )}


          {currentCustomerSubscription.subscriptionMetadata
            .subscriptionrenewson &&
            !isGift && (
              <div className="flex  mt-5 mb-6">
                <B1Text text="Next Billing Date" />
                <div className="flex flex-grow justify-end">

                  <B1Text
                    text={`${formatDateToDisplay(
                      currentCustomerSubscription.subscriptionMetadata
                        .subscriptionrenewson
                    )}`}
                  />
                </div>
              </div>
            )}
        </div>
        {!isGift && (
          <div className="flex flex-col my-9 container">
            <B1Text text="Subscription fees are billed on the same date each month and may take a few days after the billing date to process." />
          </div>
        )}

        {!isGift && (
          <YourPlan
            currentWpSub={currentCustomerSubscription}
            cusId={user?.stripe.cus_id!}
            subs={subsData.data}
            currentStripSub={currentStripSub}
          />
        )}
      </div>

      <h4 className="md:max-w-sm mt-7 !text-secondarythemecolor text-center text-12">
        By signing up you agree to our{" "}
        <Link className="underline" href="https://behindthechair.com/privacy-policy/" target="_blank">
          Terms of Use & Privacy Policy
        </Link>
      </h4>
    </div>
  );
};

export default UpdateSubscriptionServerComp;
