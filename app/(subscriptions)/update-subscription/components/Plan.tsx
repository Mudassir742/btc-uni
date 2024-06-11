import { FC, Suspense, startTransition } from "react";
import CouponForm from "./CouponForm";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import {
  ICurrentUserSub,
  getCustomerSubs,
  getStripeSubs,
} from "@/features/stripe/subscriptions";
import { getCurrentStripeSub } from "../helper";
import Stripe from "stripe";
import B1Text from "@/components/text/B1Text";
import { formatDate, formatDateToDisplay, hasDatePassed } from "@/utils/formatDate";
import PlanClientComponent from "./PlanClientComponent";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import { annualSub, annualSubWP, biannual, biannualWP, monthlySub } from "@/lib/constants";
import { getProfile } from "@/features/wp/user";
import { Button } from "@/components/ui/Button";
import { UndoCancelSubscriptionFromStripe } from "@/features/stripe/actions/undoCancelSubscriptionAction";
import { undoCancelWpSubscription } from "@/features/stripe/actions/undoCancelSubscriptionWpAction";
import toast from "react-hot-toast";
import UndoButton from "./UndoButton";
import { QueryClient } from "@tanstack/react-query";
import { getUpcomingInvoice } from "@/lib/react-query/hooks/useSubscription";
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
import { ScrollArea } from "@/components/ui/ScrollArea";
import GiftRenewsSteps from "@/components/cards/GiftRenewsSteps";
import GiftSubscriptionRenewStep2 from "./GiftSubscriptionRenewStep2";
import GiftRenewButton from "./GiftRenewButton";
import { redirect } from "next/navigation";
import PlanClientComponentV2 from "./PlanClientComponentV2";
import Image from "next/image";


type ButtonValue = string | null;
interface MyComponentProps {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}
const Plan: FC<MyComponentProps> = async ({
  searchParams,
}: MyComponentProps) => {
  const searchVal = searchParams?.q;
  const searchValStep = searchParams?.step;

  const queryClient = new QueryClient();


  const user = await getRequestCookie(cookies());
  const customerId = user?.stripe.cus_id!;



  let subsDataProm = getStripeSubs();
  let currentCustomerSubscriptionProm = getCustomerSubs(
    user?.userData?.databaseId!
  );

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
    // React Query prefetching for upcoming invoice
    queryClient.prefetchQuery<number>({
      queryKey: ['upcomingInvoice', customerId],
      queryFn: async ({ queryKey }) => {
        // Extract 'customer id' from queryKey
        const [_key, id] = queryKey as [string, string];
        return await getUpcomingInvoice(id)
      },
    }),
  ]);


  const currentCustomerSubscription = queryClient.getQueryData(['currentWpSub', user?.userData?.databaseId!]) as ICurrentUserSub;

  let paymentStatus = currentCustomerSubscription?.subscriptionMetadata.paymentStatus

  if (!currentCustomerSubscription || paymentStatus === "incomplete") {
    redirect("/subscribe")
  }

  const subscriptionCanceledOn = currentCustomerSubscription?.subscriptionMetadata.subscriptioncanceledon ?? null;
  const expiresOn = currentCustomerSubscription?.subscriptionMetadata.subscriptionexpireson;
  if (subscriptionCanceledOn || paymentStatus === "canceled" || paymentStatus === "incomplete_expired") {

    const isSubDeleted = (hasDatePassed(subscriptionCanceledOn) && hasDatePassed(expiresOn)) || hasDatePassed(expiresOn);
    return (
      <div className="lg:mt-0 mt-10 ">
        <div className="bg-themecolor-500 px-4 text-white py-12 rounded-xl flex flex-col items-center justify-center ">
          <div className="text-center font-bold text-24 ">
            {
              isSubDeleted || paymentStatus === "canceled" || paymentStatus === "incomplete_expired" ?
                <div>
                  <h2>{`No Active Subscription`}</h2>
                </div> :
                <div>
                  {/* <h2>
                    You have cancelled the subscription
                  </h2> */}
                  {
                    expiresOn && <h2 className="">
                      Your subscription has been canceled, effective: {formatDateToDisplay(expiresOn!)}
                    </h2>
                  }
                </div>
            }
          </div>
          <div className="mt-1 px-4 w-full flex justify-center">
            {isSubDeleted || paymentStatus === "canceled" || paymentStatus === "incomplete_expired" ?
              <Link className="block mt-4  max-w-sm w-full" href={'/subscribe'}>
                <Button size={"lg"} variant={"white"} className="rounded-lg w-full">
                  Subscribe Now!
                </Button>
              </Link > :
              <UndoButton currentCustomerSubscription={currentCustomerSubscription} />
            }
          </div>
        </div>
      </div >
    );
  }

  // Retrieve the cached data
  const upcomingInvoiceData = queryClient.getQueryData(['upcomingInvoice', customerId]) as number;

  const subType =
    currentCustomerSubscription.subscriptionMetadata?.upcomingsubscriptionid || currentCustomerSubscription.subscriptionMetadata.subscriptiontype.databaseId.toString();
  const paySchedule = subType == annualSubWP.toString()
    ? "Year"
    : subType == biannualWP.toString()
      ? "6 Months"
      : "Month";

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

  const planInclude = [
    {
      title: "250+ Tutorials: Unlimited Access",
      points: [
        'Full-length Tutorials, Chapter Markers, Course Highlights, Formulas & Products Used',
        'Certificates of Completion',
      ],
    },
    {
      title: "Quick Tips Library: Unlimited Access",
    },
    {
      title: "Downloadable Library: Unlimited Access",
      points: [
        'Business Management Guides',
        'Client Letters',
        'Tax Tip Guides',
        'Cutting Headsheets',
        'Social Media Workbooks',
        'Model Release Forms & more',
      ],
    },
  ]
  return (
    searchVal == "update-subscription" &&
    (
      <>
        {
          isGift ?

            <p className="py-4 px-4 !mt-7 text-14 text-themeColor font-semibold rounded-xl bg-offgreen">
              Your subscription was gifted by someone and will expire on{" "}
              {formatDateToDisplay(
                currentCustomerSubscription.subscriptionMetadata
                  .subscriptionrenewson!
              )}{" "}
              <Dialog key={"update-gift-sub"}>
                <DialogTrigger asChild>
                  <button className="underline ">Enable auto renews</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-96 overflow-y-auto  scrollbar scrollbar-track-slate-400 scrollbar-thumb-slate-50">
                  <div className="max-w-lg mt-4">
                    <Suspense
                      fallback={
                        <div>
                          <Skeleton className="w-full h-10 max-w-sm" />
                          <Skeleton className="w-full h-10 max-w-sm" />
                        </div>
                      }
                    >
                      {/* <ScrollArea className="h-80 "> */}
                      {!searchParams?.step || searchParams?.step == "1" ? (
                        <GiftRenewsSteps className="!pt-5" user={user!} />
                      ) : (
                        <GiftSubscriptionRenewStep2
                          currentWpSub={currentCustomerSubscription}
                          cusId={user?.stripe.cus_id!}
                          subs={subsData.data.filter(item => item.id !== monthlySub)}
                        />
                      )}
                      {/* </ScrollArea> */}
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
              {/* <div className="grey-line" /> */}

            </p>

            :

            <div className="w-full my-8">

              {(upcomingInvoiceData === 0 || upcomingInvoiceData) &&
                <>
                  <h2 className="text-themecolor-500 font-semibold">Your Plan</h2>
                  <div className="w-full flex flex-col bg-themecolor-50 rounded px-4 py-2 mt-4 text-16 text-themecolor-500">
                    <div className="flex justify-between items-center p-4 border-b border-secondarythemecolor">
                      <B1Text text="Subscription active since" />
                      <B1Text
                        className="!font-semibold"
                        text={formatDateToDisplay(
                          currentCustomerSubscription.subscriptionMetadata
                            .subscriptionstartson
                        )}
                      />
                    </div>
                    <div className="flex justify-between items-center p-4 border-b border-secondarythemecolor">
                      <B1Text text={currentStripSub.name} />
                      <B1Text
                        className="!font-semibold"
                        text={`$${upcomingInvoiceData?.toFixed(2)}/${paySchedule
                          }`}
                      />
                    </div>

                    {!currentCustomerSubscription.subscriptionMetadata
                      .subscriptioncanceledon && (
                        <div className="flex justify-between items-center p-4 border-secondarythemecolor">
                          <B1Text text="Next Billing Date" />
                          <B1Text
                            className="!font-semibold"
                            text={`${formatDateToDisplay(
                              currentCustomerSubscription.subscriptionMetadata
                                .subscriptionrenewson
                            )}`}
                          />
                        </div>
                      )}
                    {currentCustomerSubscription.subscriptionMetadata
                      .subscriptioncanceledon && (
                        <div className="flex justify-between items-center p-4">
                          <B1Text text="Cancellation Date" />
                          <B1Text
                            className="!font-semibold"
                            text={`${formatDateToDisplay(
                              currentCustomerSubscription.subscriptionMetadata
                                .subscriptioncanceledon
                            )}`}
                          />
                        </div>
                      )}
                  </div>
                  <p className="text-16 text-gray-400 mt-5">
                    Subscription fees are billed on the same date each month and may take a
                    few days after the billing date to process.
                  </p>
                </>
              }
              <div className="flex flex-wrap justify-between gap-2 mt-6">
                <div className="bg-themecolor-50 rounded-xl p-6 flex-1">
                  <h3 className="text-themeColor text-20 font-semibold mb-8">12-Month All-Access Plan Includes</h3>
                  {
                    planInclude.map(inc => (<>
                      <div className="flex items-center gap-4 mb-4">
                        <Image src="/tick.svg" alt="tick" width={20} height={20} />
                        <h4 className="text-themeColor text-16 font-semibold">{inc.title}</h4>
                      </div>
                      <ul className="mb-4 list-disc ml-12">
                        {inc.points?.map(point => (<>
                          <li className="text-themeColor text-12 font-semibold">{point}</li>
                        </>))}
                      </ul>
                    </>))
                  }
                </div>
                <div>
                  <PlanClientComponentV2
                    defaultValue={(price.unit_amount! / 100).toFixed(2)}
                    currentWpSub={currentCustomerSubscription}
                    customerId={user?.stripe.cus_id!}
                    subs={subsData.data}
                    currentStripSub={currentStripSub}
                    email={user?.userData?.email!}
                    name={userAdditionalData!.user.firstName}
                    currentSub={currentStripSub.name}
                    date={
                      currentCustomerSubscription.subscriptionMetadata
                        .subscriptionrenewson
                    }
                  />
                </div>
              </div>
            </div>
        }
      </>
    )
  );
};


export default Plan;
