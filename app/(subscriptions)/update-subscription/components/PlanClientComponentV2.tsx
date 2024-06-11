"use client";

import React, { FC, useState, useTransition } from "react";
// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/utils/shadcn";
import { scheduleSub } from "@/lib/services/actions/scheduleSubscription";
import { ICurrentUserSub } from "@/features/stripe/subscriptions";

// Components
import B1Text from "@/components/text/B1Text";
import SH2Text from "@/components/text/SH2Text";
import Completed from "@/components/icons/Completed";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "react-hot-toast";
import Stripe from "stripe";
import { useRouter } from "next/navigation";
import CouponForm from "./CouponForm";
import { checkCouponCode } from "@/lib/services/actions/checkCoupon";
import { useQuery } from "@tanstack/react-query";
import { incomingInvoice } from "@/app/api/webhook/events/incomingInvoice";
import { AnnualDiscountAmount, annualSub, monthlySub } from "@/lib/constants";
import { formatDateToDisplay } from "@/utils/formatDate";
import CouponFormV2 from "./CouponFormV2";
import Image from "next/image";

/**
 * Props interface for the YourPlan component.
 */
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  subs: Stripe.Product[]; // Array of Stripe products
  currentStripSub: Stripe.Product; // Currently selected Stripe product
  customerId: string; // Customer ID
  currentWpSub: ICurrentUserSub; // Current user's subscription details
  defaultValue?: string; //Default value of selected plan
  email: string;
  name: string;
  currentSub: string;
  date: string;
}

export const FormSchema = z.object({
  plan: z.string({
    required_error: "Please select a plan",
  }),
});

const PlanClientComponentV2: FC<IProps> = ({
  currentStripSub,
  subs,
  currentWpSub,
  defaultValue,
  customerId,
  email,
  name,
  currentSub,
  date,
}) => {
  const {
    data: amount,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["upcomingInvoiceAmount", customerId],
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      return await incomingInvoice(id)
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const [pending, startTransition] = useTransition();
  const { refresh } = useRouter();
  const [packages, setPackages] = useState<string>("")
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plan: currentStripSub.id,
    },
  });

  /**
   * Handles the form submission.
   *
   * @param data - The form data.
   */
  function onSubmit(data: string) {
    const selectedStripeSub = subs.find((item) => item.id === data);
    const selectSubWpId = selectedStripeSub?.metadata?.["wp-id"];
    const currentSubPriceData = currentStripSub.default_price as Stripe.Price;
    if (data === currentStripSub.id) {
      return;
    } else {
      startTransition(async () => {
        await scheduleSub(selectSubWpId!, {
          priceData: selectedStripeSub?.default_price as Stripe.Price,
          currentWpSub: currentWpSub,
          coupon,
        })
          .then(async () => {
            setShowConfirmationPopup(false);
            const amount = await refetch();
            toast.success("Your plan has been updated!");
            setCoupon(null);
            const response = fetch(
              `${process.env.NEXT_PUBLIC_SITE_URL}/api/updateSubscriptionEmail`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
                },
                body: JSON.stringify({
                  email,
                  name,
                  currentSub,
                  selectedSubName,
                  date,
                  paySchedule,
                  amount: amount.data,
                }),
              }
            );
            refresh();
          })
          .catch((err) => {
            toast.error(err.toString());
            form.setValue("plan", currentStripSub.id);
          });
      });
    }
  }

  const [dropdownEnabled, setDropdownEnabled] = useState(false); // State to track if the dropdown is enabled

  const handleButtonClick = (id: string, name: string, paySchedule: string) => {
    setSelectedValue(id);
    setSelectedSubName(name);
    setpaySchedule(paySchedule);
    setDropdownEnabled(true);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handlePlanChangeClick = () => {
    setDropdownEnabled(true); // Enable the dropdown when "Change Plan" is clicked
  };

  const [paySchedule, setpaySchedule] = useState("");
  const [selectedValue, setSelectedValue] = useState(currentStripSub.id);
  const [selectedSubName, setSelectedSubName] = useState(currentStripSub.name);
  const couponState = useState<string | null>(null);
  const [coupon, setCoupon] = couponState;
  return (
    <>
      <div className=" max-w-xl mt-8 flex flex-col">
        <h2 className="text-themecolor-500 font-semibold">Update Your Plan</h2>
        <p className="text-16 text-secondarythemecolor my-4">If you would like to change your plan, here are your options: <span className="block text-14">*plans auto renew</span></p>

        <div className="flex flex-col-reverse">
          {subs.filter((myS) => myS.id !== monthlySub).map((sub, i) => {
            const price = sub.default_price as Stripe.Price;
            const count = price.recurring?.interval_count!;
            console.log(price)
            return (
              <button
                key={i}
                disabled={currentStripSub.id === sub.id}
                className={`p-4 text-themecolor-500 bg-themecolor-50 rounded-2xl mb-4
                ${currentStripSub.id === sub.id && "cursor-not-allowed"}
                `}
                onClick={() =>
                  handleButtonClick(
                    sub.id,
                    sub.name,
                    count > 1 ? `6 month` : price.recurring?.interval!
                  )
                }
              >
                {count > 1 ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedValue === sub.id ? <Image src="/tick.svg" alt="tick" width={32} height={32} /> : <div className="w-8 h-8 border rounded-full border-secondarythemecolor" />}
                      <p>6-Month Education Plan</p>
                    </div>
                    {/* <p className="text-themecolor-500 text-20 font-semibold px-4">${ */}
                    <p className=" text-20 font-semibold px-4">${
                      sub.id === annualSub ?
                        ((price.unit_amount! - AnnualDiscountAmount) / 100).toFixed(0) :
                        (price.unit_amount! / 100).toFixed(0)
                    }/ <span className="text-14">6 Months</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedValue === sub.id ? <Image src="/tick.svg" alt="tick" width={32} height={32} /> : <div className="w-8 h-8 border rounded-full border-secondarythemecolor" />}
                      <p>12-Month All Access Plan</p>
                    </div>
                    {/* <p className="text-themecolor-500 text-20 font-semibold px-4">${ */}
                    <p className=" text-20 font-semibold px-4">${
                      sub.id === annualSub ?
                        ((price.unit_amount! - AnnualDiscountAmount) / 100).toFixed(0) :
                        (price.unit_amount! / 100).toFixed(0)
                    }/ <span className="text-14">Year</span>
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {/* {subs.filter(sub => selectedValue === `${sub.id}`).map(sub => {
          const price = sub.default_price as Stripe.Price;
          return (
            <div
              key={sub.id}
              className="flex flex-col justify-center w-max gap-3 rounded-2xl border border-secondarythemecolor overflow-hidden">
              <p className="text-themecolor-500 text-16 px-4 pt-4"></p>
              <p className="text-themecolor-500 text-20 font-semibold px-4">${
                sub.id === annualSub ?
                  ((price.unit_amount! - AnnualDiscountAmount) / 100).toFixed(0) :
                  (price.unit_amount! / 100).toFixed(0)
              }
              </p>
              <p className="text-themecolor-500 bg-themecolor-50 text-12 p-4">
                Your next charge on {`${formatDateToDisplay(date)}`} will be ${
                  sub.id === annualSub ?
                    ((price.unit_amount! - AnnualDiscountAmount) / 100).toFixed(0) :
                    (price.unit_amount! / 100).toFixed(0)
                }.
              </p>
            </div>
          )
        })} */}
        {showConfirmation && (
          <p className="flex flex-row justify-center pt-4">
            <span className="mr-2">
              <Completed fill={"black"} />
            </span>
            <B1Text text="Your plan has been updated!" />
          </p>
        )}
        <div className="mt-2">
          <CouponFormV2 couponState={couponState} />
        </div>
        <div className="pt-4 pb-3 flex items-center gap-5">
          <div className="flex flex-col flex-1">
            <Dialog
              open={showConfirmationPopup}
              onOpenChange={setShowConfirmationPopup}
            >
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="mx-auto"
                  isLoading={pending}
                  disabled={
                    !dropdownEnabled ||
                    selectedValue === defaultValue ||
                    pending
                  }
                // variant="secondary"
                >
                  Update
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Subscription</DialogTitle>
                  <DialogDescription className="mt-3 whitespace-pre-line">
                    {` You are purchasing a ${subs.find((s) => s.id === selectedValue)?.name
                      } subscription.\n \n Please be aware this change will go into effect today and your content access permissions will change immediately. However, your card will be charged on the day your current subscription ends.`}
                    .
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    isLoading={pending}
                    disabled={
                      !dropdownEnabled ||
                      selectedValue === defaultValue ||
                      pending
                    }
                    onClick={() => onSubmit(selectedValue!)}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-1 justify-center pt-5 pb-3">
            <Button type="button" variant={"outline"}>
              <Link href={`/cancel?${new URLSearchParams({
                q: "CancelStep1",
              })}`}>Cancel Plan</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getUpcomingInvoice = async (customerId: string) => {
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;

  const response = await fetch(
    `https://api.stripe.com/v1/invoices/upcoming?customer=${customerId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch upcoming invoice: ${responseData.error.message}`
    );
  }

  return responseData.amount_due / 100;
};

export default PlanClientComponentV2;
