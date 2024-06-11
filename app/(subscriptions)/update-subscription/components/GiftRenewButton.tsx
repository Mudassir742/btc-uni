"use client";
import { scheduleSub } from "@/lib/services/actions/scheduleSubscription";
import { cn } from "@/utils/shadcn";
import { createUrl } from "@/utils/url";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, HTMLAttributes, useTransition } from "react";
import Stripe from "stripe";
import { ICurrentUserSub } from "@/features/stripe/subscriptions";
// Utils
// import { cn } from '@/utils/shadcn'
// Components
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  subs: Stripe.Product[]; // Array of Stripe products
  currentStripSub: Stripe.Product; // Currently selected Stripe product
  cusId: string; // Customer ID
  currentWpSub: ICurrentUserSub; // Current user's subscription details
}

const GiftRenewButton: FC<IProps> = ({
  className,
  children,
  currentStripSub,
  currentWpSub,
  cusId,
  subs,
  ...props
}) => {
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const { replace, refresh } = useRouter();

  const cardId = searchParams?.get("cardId");
  const step = searchParams?.get("step");
  const newSearchParams = new URLSearchParams(searchParams!);

  const isNextButton = !step || step == "1";
  const subscriptionId = searchParams?.get("subscriptionId");

  const isStep2 = !isNextButton && !subscriptionId && step == "2";

  const handleRenew = async () => {
    startTransition(async () => {
      if (isNextButton && cardId) {
        newSearchParams.set("step", "2");
        replace(createUrl(location.pathname, newSearchParams));
      } else {
        const selectedStripeSub = subs.find(
          (item) => item.id === subscriptionId
        );

        const selectSubWpId = selectedStripeSub?.metadata?.["wp-id"];

        await scheduleSub(selectSubWpId!, {
          coupon: null,
          priceData: selectedStripeSub?.default_price as Stripe.Price,
          currentWpSub: currentWpSub,
          cardId: cardId!,
        })
          .then(() => {
            refresh();
            
            newSearchParams.delete("step");
            newSearchParams.delete("cardId");
            newSearchParams.delete("subscriptionId");
            
            newSearchParams.set("success", "true");
            
            replace(createUrl(location.pathname, newSearchParams));
            toast.success("Your plan has been updated!");
          })
          .catch((err) => {
            toast.error(err.toString());
          });
      }
    });
  };

  return (
    <Button
      onClick={handleRenew}
      disabled={(isNextButton && !cardId) || isStep2 || pending ? true : false}
      variant={"secondary"}
      className={cn("", className)}
      {...props}
    >
      {isNextButton ? "Next" : "Renew"}
    </Button>
  );
};

export default GiftRenewButton;
