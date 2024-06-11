"use client"

import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/Button";
import { UndoCancelSubscriptionFromStripe } from "@/features/stripe/actions/undoCancelSubscriptionAction";
import { undoCancelWpSubscription } from "@/features/stripe/actions/undoCancelSubscriptionWpAction";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const UndoButton = ({ currentCustomerSubscription }: { currentCustomerSubscription: any }) => {
  const [isLoading, setIsLoading] = useState(false);
    const [pending, startTransition] = useTransition()
    const { refresh } = useRouter();

    return (
    <Button
      isLoading
            onClick={async () => {
              setIsLoading(true);
              startTransition(async () => {
                const wpRes = undoCancelWpSubscription(
                  currentCustomerSubscription,
                  ""
                );
                const stripeRes = UndoCancelSubscriptionFromStripe(
                  currentCustomerSubscription.subscriptionMetadata
                    .stripesubscriptionid,
                  currentCustomerSubscription.subscriptionMetadata
                    .stripesubscriptionscheduleid
                );

                await Promise.all([wpRes, stripeRes]).then((values) => {
                  toast.success("Subscription revived");
                  refresh()
                });
              });
            }}
            disabled={isLoading}
            className="bg-white text-themecolor-500 mt-4 rounded-lg"
          >
            Undo Cancellation
          </Button>
  )
}

export default UndoButton