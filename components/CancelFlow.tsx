"use client";
import React, { useEffect, useState, useTransition } from "react";
// Form for reason for canceling using react-hook-form and shadcn UI
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Utils
import { handleError } from "@/utils/stripeErrorHandling";
import { cancelSubscriptionFromStripe } from "@/features/stripe/actions/cancelSubscriptionAction";
import toast from "react-hot-toast";

import { UserSession } from "@/interfaces";
import { cancelWpSubscription } from "@/features/stripe/actions/cancelSubscriptionWpAction";
// Components
import H1Text from "./text/H1Text";
import SH1Text from "./text/SH1Text";
import B1Text from "./text/B1Text";
import CertificateForCancelFlow from "./icons/CertificateForCancelFlow";
import SH2Text from "./text/SH2Text";

import Link from "next/link";
import { Button } from "./ui/Button";
import BackWithOnClick from "./buttons/BackWithOnClick";
import { ICurrentUserSub } from "@/features/stripe/subscriptions";
import { formaToWptDate, formatDateToDisplay } from "@/utils/formatDate";
import Loader from "./ui/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
// Constants
import { cancelationReasons } from "@/lib/constants";
import Herotext from "./text/Hero";
import { Award, Download, Bookmark } from "lucide-react";
import ParagraphText from "./text/Paragraph";
import GoBackButton from "./ui/GoBackButton";
import { IUserProfile } from "@/features/wp/user";
import H3Text from "./text/H3Text";
import H4Text from "./text/H4Text";
import CourseTitle from "./text/CourseTitle";
import { cancelSubscriptionEmail } from "@/app/api/webhook/events/cancelSubscriptionEmail";
import { getCurrentUserData } from "@/app/helper";
import { useRouter } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { createUrl } from "@/utils/url";

// Form Schema
const FormSchema = z.object({
  reason: z.enum(
    [
      "I don't use BTC-U enough.",
      "I did not find the content valuable.",
      "The price is over my budget.",
      "I have left the industry.",
      "I choose not to answer",
    ],
    {
      required_error: "Please select a reason for canceling",
    }
  ),
});

const NextButton = ({
  handleNext,
  text,
}: {
  handleNext: () => void;
  text?: string;
}) => (
  <Button
    variant="secondary"
    onClick={() => {
      handleNext();
      typeof window !== undefined && window.scrollTo(0, 0);
    }}
  >
    Cancel Subscription
  </Button>
);

const BackButton = ({
  handleBack,
  text,
}: {
  handleBack: () => void;
  text?: string;
}) => (
  <BackWithOnClick
    onClick={() => {
      handleBack();
      typeof window !== undefined && window.scrollTo(0, 0);
    }}
  />
);

interface IProps {
  sub: ICurrentUserSub;
  profile: IUserProfile | null;
  user: UserSession;
  numberOfCertificates: number;
  numberOfPinnedCourses: number;
  searchParams: {
    q: string;
  };
}

// interface IProps {

//   numberOfCertificates: number
//   numberOfPinnedCourses: number
// }

function useOneTimeRefresh() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // Leverage useEffect with an empty dependency array
  // to trigger the effect only once on component mount
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload(); // Trigger page refresh
      setShouldRefresh(false); // Reset state after refresh
    }
  }, [shouldRefresh]);

  // Function to initiate the refresh
  const triggerRefresh = () => {
    setShouldRefresh(true);
  };

  return triggerRefresh;
}

const CancelFlow: React.FC<IProps> = ({
  sub,
  numberOfPinnedCourses,
  profile,
  numberOfCertificates,
  user,
  searchParams,
}) => {
  // const user: UserSession = {

  //   isLoggedIn: true,
  //   authToken: '',
  //   refreshToken: '',
  //   userDataId: 0,
  //   stripe: {
  //       cus_id: '',
  //   },
  //   userData: {
  //       userDatas: {
  //         edges: []
  //       },
  //       databaseId: 0,
  //       name: '',
  //       email: '',
  //       isVerified: true,
  //   },

  // }
  // const sub: ICurrentUserSub = {
  //   title: '',
  //   databaseId: 0,
  //   subscriptionMetadata: {
  //     subscriptionrenewson: '',
  //     subscriptionexpireson: null,
  //     stripesubscriptionid: '',
  //     upcomingsubscriptionid: '',
  //     subscriptionstartson: '',
  //     subscriptiontype: {
  //       databaseId: 0,
  //       title: ''
  //     }
  //   },
  // }

  const [section, setSection] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const { refresh, replace } = useRouter();
  const refreshFunction = useOneTimeRefresh();

  const handleNext = () => {
    setSection(section + 1);
  };

  const handleBack = () => {
    setSection(section - 1);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const cus = {
    name: profile?.user.firstName,
    email: user.userData?.email,
    current_period_end: sub.subscriptionMetadata.subscriptionrenewson,
  };

  const searchVal = searchParams?.q;


  return (
    <div className="">
      <div className="justify-center">
        {(searchVal === "CancelStep1" || !searchVal )&& (
          <>
            <div className="flex lg:flex-col gap-y-2 relative my-4 gap-x-4">
              <div className=""></div>
              <div className="flex flex-grow  w-full">
                <H3Text text="Thinking of canceling your Premium subscription?" />
              </div>
            </div>
            <ParagraphText text=" Your membership isn’t set to renew until:" />

            <div className="space-under-category-titles" />
            <div className="flex items-center text-center font-semibold text-xl text-themeColor">
              {formatDateToDisplay(
                sub.subscriptionMetadata.subscriptionrenewson
              )}
            </div>

            <div className="space-between-categories" />
            {/* <div className='flex-wrap justify-center text-center break-words'>

              <B1Text text='Keep enjoying unlimited access and we can remind you 5 days before your renewal.' />
            </div> */}

            {/* <div className='space-between-categories' /> */}
            {/* <div className='flex justify-center'>

              <Link href="/profile">
                <Button variant="secondary" >Notify Me Later</Button>
              </Link>
            </div> */}

            {/* <div className='space-between-categories' /> */}

            <H4Text text="If you cancel now you will lose all of your hard work!" />

            <div className="space-between-categories" />
            <div className="gap-y-4 md:flex  md:gap-x-4">
              <div className="flex md:w-1/3  border-[1px] border-border rounded-xl py-4">
                <div className=" w-24 lg:w-32  flex p-3">
                  <Award size={44} />
                </div>

                <div className="max-w-[434px] w-full">
                  <div className="flex flex-wrap gap-x-2 ">
                    <SH2Text text="You Have" />
                    <SH2Text text={String(numberOfCertificates)} />
                    <SH2Text text="Certificates" />
                  </div>
                  <div className="">
                    <B1Text text="Utilize our education to make more money in your field. New, valuable courses added each week." />
                  </div>
                </div>
                <div className="space-between-categories" />
              </div>

              <div className="flex md:w-1/3  border-[1px] border-border rounded-xl py-4">
                <div className=" w-24 lg:w-32 flex p-3">
                  <Bookmark size={44} color="#523D34" />
                </div>

                <div className="max-w-[434px] w-full">
                  <div className="flex flex-wrap gap-x-2 ">
                    <SH2Text text="You Have" />
                    <SH2Text text={String(numberOfPinnedCourses)} />
                    <SH2Text text="Courses Saved" />
                  </div>
                  <div className="">
                    <B1Text text="Don’t lose access to the courses you love! " />
                  </div>
                </div>
                <div className="space-between-categories" />
              </div>

              <div className="flex md:w-1/3  border-[1px] border-border rounded-xl py-4">
                <div className=" w-24 lg:w-32 p-3 flex ">
                  <Download size={44} />
                </div>

                <div className="max-w-[434px] w-full">
                  <div className="">
                    <SH2Text text="100+ Downloadables" />
                  </div>
                  <div className="">
                    <B1Text text="Access to workbooks, headsheets, letters & notes. " />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-between-categories" />

            <div className="justify-center md:justify-start break-words">
              <CourseTitle text="If you are sure you want to go, please proceed to cancel subscription." />
            </div>
            <div className="space-between-categories" />
            <div className="md:flex md:gap-x-4">
              <div className="flex justify-center">
                <Button>
                  <Link href="/profile">Keep Subscription</Link>
                </Button>
              </div>
              <div className="space-under-category-titles" />

              <div className="flex flex-col items-center justify-center">
                {/* <NextButton handleNext={handleNext} text={undefined} /> */}
                <Link
                  href={`?${new URLSearchParams({
                    q: "CancelStep2",
                  })}`}
                  className="flex items-center w-full"
                >
                  <Button variant="secondary">Cancel Subscription</Button>
                </Link>
              </div>
            </div>

            <div className="space-between-categories" />

            <CourseTitle text="Canceling is effective immediately, however you will still have access until the date above." />

            <div className="space-between-categories" />
          </>
        )}

        {searchVal === "CancelStep2" && (
          <>
            <div className="flex- wrap break-words">
              {/* <BackButton handleBack={handleBack} /> */}

              <Herotext text="Before you go..." />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => { })} id="cancel-flow">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="space-between-categories" />
                        <FormLabel>
                          <div className="flex-wrap break-words max-w-[530px]">
                            <Herotext text="We want to know why you are leaving, please select one:" />
                          </div>
                        </FormLabel>
                        <div className="space-under-category-titles" />
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {cancelationReasons.map((reason: string) => (
                              <FormItem
                                key={reason}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={reason} />
                                </FormControl>
                                <FormLabel className="text-18 cursor-pointer">
                                  {reason}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className="space-between-categories" />
            <div className="flex flex-col items-center justify-center">
              <div className="">
                <Button
                  disabled={pending || !!!form.getValues("reason")}
                  onClick={async () => {
                    startTransition(async () => {
                      const queryClient = new QueryClient();
                      const wpRes = cancelWpSubscription(
                        sub,
                        form.getValues("reason")
                      );
                      const stripeRes = cancelSubscriptionFromStripe(
                        sub.subscriptionMetadata.stripesubscriptionid,
                        sub.subscriptionMetadata.stripesubscriptionscheduleid
                      );
                      cancelSubscriptionEmail(cus);
                      await Promise.all([wpRes, stripeRes]).then((values) => {
                        toast.success("Subscription canceled");
                        setSection(section + 1);
                        let newSp = new URLSearchParams();
                        newSp.set("q", "CancelStep3")
                        replace(createUrl("/cancel", newSp))
                        // refreshFunction(); // Call refreshFunction after cancelation
                        refresh()
                       
                      });
                    });
                  }}
                >
                  {pending && (
                    <Loader className="h-6 text-themeColor opacity-60" />
                  )}
                  <span className="-ml-1">Cancel Subscription</span>
                </Button>
              </div>

              <div className="space-under-category-titles" />

              <div className="">
                <Link href="/profile">
                  <Button variant="secondary">Keep Subscription</Button>
                </Link>
              </div>

              <div className="space-between-categories" />
            </div>
          </>
        )}

        {searchVal === "CancelStep3" && (
          <>
            <div className="flex-wrap break-words ">
              {/* Mobile */}
              <div className="md:hidden">
                <H1Text text="Canceled" />
              </div>

              {/* Desktop */}
              <div className="hidden md:block">
                <div className="flex justify-center">
                  <H1Text text="Canceled" />
                </div>
              </div>

              <div className="space-under-category-titles" />

              <div className="">
                <SH1Text
                  text={`Your subscription has been canceled, ${profile?.user.firstName}`}
                />
              </div>
              <div className="space-under-category-titles" />

              {/* Additional content for the final section */}
              <div className="">
                <ParagraphText
                  text={`You will continue to have access until the end your subscription date, on that date you will recieve an cancelation confirmation email.`}
                />
                {/* <ParagraphText text={`You will continue to have access until {LASTDAY-HERE}, on that date you will recieve an cancelation confirmation email.`} /> */}

                <ParagraphText text="You will not be auto-billed going forward. Please note that canceling your subscription does not stop any purchases in process outside of the subscription." />
              </div>
              <div className="space-under-category-titles" />

              <div className="">
                <ParagraphText text="We hope to see you back!" />
              </div>
              <div className="space-under-category-titles" />

              <div className="">
                <ParagraphText text="xoxo" />
              </div>
              <div className="">
                <ParagraphText text="Mary Rector & the BTCU Team" />
              </div>

              <div className="space-between-categories" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CancelFlow;

// to do: the remind me later button should set up an email to remind the person
// to do: also these radio button cancel answers aren't actually being recorded anywhere...
