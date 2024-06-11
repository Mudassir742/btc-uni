"use client";
import { FormSchema } from "@/components/YourPlan";
import { ICurrentUserSub } from "@/features/stripe/subscriptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, HTMLAttributes, useTransition } from "react";
import { useForm } from "react-hook-form";
import Stripe from "stripe";
import * as z from "zod";
import { cn } from "@/utils/shadcn";
// Components
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
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createUrl } from "@/utils/url";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  subs: Stripe.Product[]; // Array of Stripe products
  currentWpSub: ICurrentUserSub;
  cusId: string;
}

const GiftSubscriptionRenewStep2: FC<IProps> = ({
  currentWpSub,
  cusId,
  subs,

  className,
  ...props
}) => {
  const [pending, startTransition] = useTransition();
  const { refresh, replace } = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plan: searchParams?.get("subscriptionId") || "",
    },
  });

  return (
    <div {...props}>
      <Form {...form}>
        <form id="gift-subscription-renew-step-2">
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Select your subscription</FormLabel>
                <Select
                  onValueChange={(e) => {
                    startTransition(() => {
                      field.onChange(e);

                      const newSearchParams = new URLSearchParams(
                        searchParams!
                      );
                      newSearchParams.set("subscriptionId", e);
                      replace(createUrl(location.pathname, newSearchParams));
                    });
                  }}
                  defaultValue={searchParams?.get("subscriptionId") || ""}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={pending}
                      className="mt-3 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                      <SelectValue placeholder="Select your plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className={cn("overflow-y-auto  scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-500 max-h-[10rem]", {
                      "h-[6.7rem]": subs.length <= 3,
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
                          {sub.name} - ${(price.unit_amount! / 100).toFixed(2)}/
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

          {/* <div className="pt-5 pb-3">
            <div className="flex flex-col">
              <Button
                type="submit"
                className="mx-auto"
                isLoading={pending}
                disabled={pending}
                variant="secondary"
              >
                Update
              </Button>
            </div>
          </div> */}
        </form>
      </Form>
    </div>
  );
};

export default GiftSubscriptionRenewStep2;
