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
import B1Text from "./text/B1Text";
import SH2Text from "./text/SH2Text";
import Completed from "./icons/Completed";
import { Button } from "./ui/Button";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "react-hot-toast";
import Stripe from "stripe";
import { handleError } from "@/utils/stripeErrorHandling";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
import { Label } from "./ui/Label";
import { useMutation } from "@tanstack/react-query";

/**
 * Props interface for the YourPlan component.
 */
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  subs: Stripe.Product[]; // Array of Stripe products
  currentStripSub: Stripe.Product; // Currently selected Stripe product
  cusId: string; // Customer ID
  currentWpSub: ICurrentUserSub; // Current user's subscription details
}

export const FormSchema = z.object({
  plan: z.string({
    required_error: "Please select a plan",
  }),
});

const YourPlan: FC<IProps> = ({
  currentStripSub,
  subs,
  currentWpSub,
  cusId,
}) => {
  const [pending, startTransition] = useTransition();
  const { refresh } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plan: currentStripSub.id,
    },
  });

  const { mutate, isSuccess, error, isError } = useMutation({
    mutationFn: (variable: {
      upcomingSubWpId: string;
      obj: {
        priceData: Stripe.Price;
        coupon: null;
        currentWpSub: ICurrentUserSub;
      };
    }) => {
      const { upcomingSubWpId, obj } = variable
      return scheduleSub(upcomingSubWpId, obj)
    }
  })
  /**
   * Handles the form submission.
  *
  * @param data - The form data.
  */
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedStripeSub = subs.find((item) => item.id === data.plan);

    const selectSubWpId = selectedStripeSub?.metadata?.["wp-id"];

    const currentSubPriceData = currentStripSub.default_price as Stripe.Price;
    if (data.plan === currentStripSub.id) {
      console.log('clicked')
      return;
    } else {
      // console.log('not clicked')
      // startTransition(async () => {
      const variables = {
        upcomingSubWpId: selectSubWpId!,
        obj: {
          priceData: selectedStripeSub?.default_price as Stripe.Price,
          coupon: null,
          currentWpSub: currentWpSub,
        }
      }
      mutate(variables)
      if (isSuccess) {
        setShowConfirmationPopup(false);
        toast.success("Your plan has been updated!");
        refresh();
      }
      if (isError) {
        console.log(error)
        toast.error(error.toString());
        form.setValue("plan", currentStripSub.id);
      }
      console.log(isSuccess, isError)
      // .then(() => {
      //   setShowConfirmationPopup(false);
      //   toast.success("Your plan has been updated!");
      //   refresh();
      // })
      // .catch((err) => {
      //   toast.error(err.toString());
      //   form.setValue("plan", currentStripSub.id);
      // });
      // });
    }
  }

  const [dropdownEnabled, setDropdownEnabled] = useState(false); // State to track if the dropdown is enabled

  const handleButtonClick = () => {
    setShowConfirmation(true);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handlePlanChangeClick = () => {
    setDropdownEnabled(true); // Enable the dropdown when "Change Plan" is clicked
  };

  return (
    <>
      <div className="w-full h-full overflow-y-auto bg-white">
        <div className="yourplan-changeplan">
          <div className="flex items-center">
            <input id="change-plan" type="radio" name="changePlan" />
            <label
              htmlFor="change-plan"
              className={`cursor-pointer ${dropdownEnabled ? "text-themeColor" : "text-themeColor"
                }`}
              onClick={handlePlanChangeClick}
            >
              <SH2Text text="&nbsp;Change Plan" />
            </label>
          </div>
          {/* Change Plan Dropdown */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="your-plan">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    {/* <FormLabel>Email</FormLabel> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={currentStripSub.id}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="disabled:text-gray-500"
                          disabled={!dropdownEnabled}
                        >
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={cn("", {
                          "h-[7.6rem]": subs.length <= 3,
                        })}
                      >
                        {subs.map((sub) => {
                          const price = sub.default_price as Stripe.Price;
                          const count = price.recurring?.interval_count!;
                          return (
                            <SelectItem
                              key={sub.id}
                              value={sub.id}
                              className="text-themeColor"
                            >
                              {sub.name} - $
                              {(price.unit_amount! / 100).toFixed(2)}/
                              {count > 1
                                ? `${price.recurring?.interval_count} `
                                : ""}
                              {price.recurring?.interval}
                              {count > 1 && "s"}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {showConfirmation && (
                <p className="flex flex-row justify-center pt-4">
                  <span className="mr-2">
                    <Completed fill={"black"} />
                  </span>
                  <B1Text text="Your plan has been updated!" />
                </p>
              )}
              <div className="pt-8 pb-3">
                <div className="flex flex-col">
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
                          currentStripSub.id === form.getValues("plan") ||
                          pending
                        }
                        variant="secondary"
                      >
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Subscription</DialogTitle>
                        <DialogDescription className="mt-3 whitespace-pre-line">
                          {` You are purchasing a ${subs.find((s) => s.id === form.watch("plan"))?.name
                            } subscription.\n \n Please be aware that it will become in effect and you will get charged on the day your current subscription ends. However, your content access level permissions will change immediately`}
                          .
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button
                          isLoading={pending}
                          disabled={
                            !dropdownEnabled ||
                            currentStripSub.id === form.watch("plan") ||
                            pending
                          }
                          onClick={async () => {
                            await form.handleSubmit(onSubmit)();
                          }}
                          type="submit"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex justify-center pt-5 pb-3">
                  <Button type="button">
                    <Link href="/cancel">Cancel Plan</Link>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default YourPlan;

// to do: bring in users real info here -- jan 11 mihai comment: i think this is done
{
  /* <SubTiers setSelectedPlan={function (value: React.SetStateAction<string | null>): void {
              throw new Error('Function not implemented.');
            }} /> */
}
