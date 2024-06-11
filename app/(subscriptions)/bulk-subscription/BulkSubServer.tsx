import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { getStripeSubs } from '@/features/stripe/subscriptions';
import { annualSub } from '@/lib/constants';
import Stripe from 'stripe';
// Components
import { BulkSubscription } from './BulkSubscription'
interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const BulkSubServer: FC<IProps> = async ({ className, ...props }) => {

    let subData = await getStripeSubs();

    if (!subData) {
        throw "Somthing went wrong";
    }

    const annualSubData = subData.data.find((item) => item.id === annualSub)
    const price = annualSubData?.default_price as Stripe.Price
    return (
        <div className={cn("", className)} {...props}>
            <BulkSubscription priceInCents={price.unit_amount!} className="md:max-w-sm" />
        </div>
    )
}

export default BulkSubServer