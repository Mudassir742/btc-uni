
"use client"
import { FC, HTMLAttributes, useTransition } from 'react'
// Utils
import { cn } from "@/utils/shadcn";
import Stripe from 'stripe';
import { scheduleSub } from '@/lib/services/actions/scheduleSubscription';
import { UserSession } from '@/interfaces';
import { ICurrentUserSub } from '@/features/stripe/subscriptions';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  plansData: Stripe.Product[];
  currentSub: ICurrentUserSub | null
  user: UserSession | null
}

const UpdateSubscription: FC<IProps> = ({
  currentSub,
  plansData,
  className,
  user,
  ...props
}) => {
  const currentStripeSub = plansData?.find((item) => {
    const metadata = item.metadata as { "wp-id": string }
    return Number(metadata["wp-id"]) === currentSub?.subscriptionMetadata.subscriptiontype.databaseId
  })

  const [pending, startTransition] = useTransition();
  return (
    <div className={cn("mt-4 ", className)} {...props}>
      {
        plansData.map((item) => {
          const price = item.default_price as Stripe.Price

          return (
            <div key={item.id}>
              {/* <form action={scheduleSub}> */}
              <button
                // onClick={() => {
                //   startTransition(async () => {
                //     await scheduleSub(user?.stripe.cus_id!, {
                //       priceId: price.id,
                //       currentPeriodEnd: currentSub?.subscriptionMetadata.subscriptionrenewson ?? "",
                //       productSubStripeId: currentStripeSub?.id!,
                //     });
                //   });
                // }}
                type='submit'
                disabled={item.id === currentStripeSub?.id}
                className='hover:underline disabled:opacity-50 disabled:cursor-not-allowed'>
                {item.name}
              </button>
              {/* </form> */}
            </div>
          )
        })
      }
    </div>
  )
}

export default UpdateSubscription