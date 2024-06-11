import dynamic from "next/dynamic";
// import AuthContent from "../../components/AuthContent";
// Utils
import { getProfile } from "@/features/wp/user";
import { FolderSync } from 'lucide-react';
import MyInfo from "@/components/MyInfo";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/Dialog";
import { Suspense } from "react";
import { BadgeCheck, LayoutGrid, LockKeyhole, SearchSlash } from "lucide-react";

import CreditCard from "@/components/icons/CreditCard";
import Subscription from "@/components/icons/Subscription";

import { redirect, useRouter } from "next/navigation";
import { UpdateProfile } from "./components/UpdateProfile";
import { cookies } from "next/headers";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";
import BasicsFormSuspense from "../(auth)/basics/BasicsFormSuspense";
// import { ScrollArea } from "@/components/ui/ScrollArea";
import LogoutButton from "./components/Logout";
import CreditCardDetails, {
  // BillingHeader,
} from "@/components/cards/CreditCardDetails";
import UpdateCard from "@/components/cards/UpdateCard";
import InvoicesList from "@/components/molecules/InvoicesList";
// import ResetPassword from "./components/ResetPassword";
import PopUp from "./components/PopUp";
import UpgradeCallOut from "@/components/UpgradeCallOut";
import { User, HelpCircle } from "lucide-react";
import DashboardPageProfilePage from "./components/DashboardPageProfilePage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import Plan from "../(subscriptions)/update-subscription/components/Plan";
import UpdateSubStep2 from "../(subscriptions)/update-subscription/components/UpdateSubStep2";
import ForgotPassword from "@/app/(auth)/forgot-password/components/ForgotPassword";
import { cn } from "@/utils/shadcn";
import Completed from "../completed/components/CompletedMain";
import H4Text from "@/components/text/H4Text";
import H5Text from "@/components/text/H5Text";
import ParagraphText from "@/components/text/Paragraph";
// import UpdateSubscriptionServerComp from "../(subscriptions)/update-subscription/components/UpdateSubscriptionServerComp";

const amountOfCoursesCompleted = 19;
const amountOfCertificates = 19;
const upcomingDate = "10/23";
const upcomingCourseTitle = "Upcoming Class Name";
const themeColor = "#523D34";
let imageWidth = 172; // Default for mobile
let imageHeight = 229; // Default for mobile

// const AuthContent = dynamic(() => import("../../components/AuthContent"), {
//   ssr: false,
// });

// AuthContent has been deprecated following Hamzahs code
// to do: implement alternative checking

const Profile = async ({
  searchParams,
}: {
  searchParams: {
    previousUserData: string;
    q: string;
  };
}) => {
  // const [isMyInfoOpen, setIsMyInfoOpen] = useState(false);
  // const [isYourPlanOpen, setIsYourPlanOpen] = useState(false);
  // const [pending, startTransition] = useTransition()
  // const { push, refresh } = useRouter()
  // const [isLoading, setIsLoading] = useState(false)

  const user = await getRequestCookie(cookies());
  if (!user) {
    redirect("/login");
  }
  const userAdditionalData = await getProfile(user.userData?.databaseId!);

  if (!userAdditionalData?.user.firstName) {
    redirect("/basics/");
  }

  const searchVal = searchParams?.q;

  return (
    <>
      <main className="Account-Information-page container mx-auto ">

        <div className="md:flex">
          <div className="md:w-4/12 md:min-w-[300px] md:pr-[30px]">
            <UpdateProfile
              userAdditionalData={userAdditionalData}
              user={user}
            />

            <div className="flex justify-center ">
              <Suspense>
                <UpgradeCallOut color={themeColor} user={user} />
              </Suspense>
            </div>

            <div className="space-under-category-titles" />
            <div className="md:pt-4 md:pb-8 container mx-auto md:px-0 md:mx-0">
              <div className="border-[1px] border-border rounded-xl container md:max-w-[570px] md:justify-center md:mx-auto">
                <div className="py-0 md:py-4 flex flex-col gap-y-8">
                  <Accordion
                    defaultValue="item-1"
                    type="single"
                    collapsible
                    className=""
                  >
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionContent className="flex flex-col  gap-1 no-underline outline-none mt-2">
                        {/* Profile */}
                        <div
                          className={cn(
                            [
                              `w-full leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white":
                                searchParams.q === undefined,
                            }
                          )}
                        >
                          <Link
                            href={"/profile"}
                            className="flex items-center w-full"
                          >
                            <div className="pr-4">
                              <LayoutGrid />
                            </div>
                            <p className="!text-16">Profile</p>
                          </Link>
                        </div>

                        {/* Certificates */}
                        <div
                          className={cn(
                            [
                              `w-full leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white ":
                                searchVal === "certificates",
                            }
                          )}
                        >
                          <Link
                            href={`?${new URLSearchParams({
                              q: "certificates",
                            })}`}
                            className="flex items-center w-full"
                          >
                            <div className="pr-4">
                              <BadgeCheck />
                            </div>
                            <p className="!text-16" >View Certificates</p>
                          </Link>

                        </div>

                        {/* Update My Subscription */}
                        <div
                          className={cn(
                            [
                              `w-full leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white ":
                                searchVal === "update-subscription",
                            }
                          )}
                        >
                          <Link
                            href={`?${new URLSearchParams({
                              q: "update-subscription",
                            })}`}
                            className="flex items-center w-full"
                          >
                            <div className="pr-4">
                              {/* <FolderSync/> */}
                              <FolderSync
                                color={
                                  searchVal === "update-subscription"
                                    ? "white"
                                    : "black"
                                }
                              />
                            </div>
                            <p className="!text-16">Update Subscription</p>
                          </Link>
                        </div>

                        {/* Update My Info */}
                        <div
                          className={cn(
                            [
                              `w-full leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white ":
                                searchVal === "info",
                            }
                          )}
                        // onClick={openMyInfoModal}
                        >
                          <Link
                            href={`?${new URLSearchParams({
                              q: "info",
                            })}`}
                            className="flex items-center w-full"
                          >
                            <div className="pr-4">
                              <User />
                            </div>
                            <p className="!text-16">My Info</p>
                          </Link>
                        </div>

                        {/* Billing */}
                        <div
                          className={cn(
                            [
                              `w-full leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white ":
                                searchVal === "payment",
                            }
                          )}
                        >
                          <div className="flex">
                            <Link
                              href={`?${new URLSearchParams({
                                q: "payment",
                              })}`}
                              className="flex items-center w-full"
                            >
                              <div className="pr-4">
                                <CreditCard
                                  fill={
                                    searchVal === "payment" ? "white" : "black"
                                  }
                                />
                              </div>
                              <p className="!text-16">Payment Info</p>
                            </Link>
                          </div>
                        </div>

                        {/* Reset Password */}
                        <Link
                          href={`?${new URLSearchParams({
                            q: "forgot-password",
                          })}`}
                          className={cn(
                            [
                              `w-full flex leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white ":
                                searchVal === "forgot-password",
                            }
                          )}
                        >
                          <div className="pr-4">
                            <LockKeyhole />
                          </div>
                          <p className="!text-16">Reset Password</p>
                        </Link>

                        {/* Support */}
                        <Link
                          href={"/support"}
                          className={cn(
                            [
                              `w-full flex items-center leading-150 p-3 lg:p-4 rounded-lg text-left !text-16 font-semibold text-themecolor-500`,
                            ],
                            {
                              "bg-themecolor-500  !text-white ":
                                searchVal === "support",
                            }
                          )}
                        >
                          <div className="pr-4">
                            <HelpCircle />
                          </div>
                          <p className="!text-16">Customer Support</p>
                        </Link>

                        <div className="flex items-center group pb-0">
                          <LogoutButton />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* column 2 */}
          <div className="md:w-8/12 md:pb-6">
            <Suspense
              fallback={
                <div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>
              }
            >
              <DashboardPageProfilePage
                themeColor={themeColor}
                user={user}
                searchParams={searchParams}
              />
              {searchParams.q === "update-subscription" && (
                <Plan searchParams={searchParams} />
                // <UpdateSubscriptionServerComp className="my-10 lg:mt-20" />
              )}
              <UpdateSubStep2
                className="mt-0 lg:mt-20"
                searchParams={searchParams}
              />
              {searchParams.q === "info" && (
                <BasicsFormSuspense
                  type="modal"
                  className="my-20 px-4 h-full"
                  user={user}
                  searchParams={searchParams}
                />
              )}
              <div
                className={cn(
                  [
                    `w-full my-20 col-span-12 md:col-span-8 !px-5 md:px-10 pt-6 hidden`,
                  ],
                  {
                    block: searchVal == "payment",
                  }
                )}
              >
                <H4Text text="Update Your Payment Info" />
                <H5Text text="Payment Details" className="mt-10 text-themeColor" />
                <ParagraphText text="Ready to keep your payment info up to date? Simply click 'Add Payment Method' below to add new options. Once added, don't forget to remove the old method, ensuring your new one becomes the default for hassle-free transactions. Miss this step, and we'll keep trying to charge the old card. Stay current and keep things smooth"/>

                <div className="max-w-xl mt-4">

                  <Suspense
                    fallback={
                      <div>
                        <Skeleton className="w-full h-10 max-w-sm" />
                        <Skeleton className="w-full h-10 max-w-sm" />
                      </div>
                    }
                  >
                    <CreditCardDetails user={user} />
                  </Suspense>
                </div>
                {/* Invoices */}
                <InvoicesList className="mt-8" user={user} />
              </div>
              <UpdateCard user={user} searchParams={searchParams} />
              <ForgotPassword searchParams={searchParams} />
              {searchParams.q === "certificates" && (
                <Completed
                  certificateWrapperClassName="md:grid-cols-2"
                  className="my-10 lg:mt-16 mx-0"
                  searchParams={searchParams}
                />
              )}
            </Suspense>
          </div>
        </div>

        {/* <div className='space-between-categories' />
        {isMyInfoOpen && (
          <MyInfo />
          )}


        {/* <YourPlan /> */}
      </main>
    </>
  );
};

export default Profile;
