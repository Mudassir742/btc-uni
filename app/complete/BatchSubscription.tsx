import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { PurchaseTypes } from './page'
// Components
import SH1Text from '@/components/text/SH1Text'
import ParagraphText from '@/components/text/Paragraph'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import WelcomeComponentGift from '@/components/WelcomeComponentGift'
import { UserSession } from '@/interfaces'
// import WelcomeComponent from '@/components/WelcomeComponent'

interface IProps extends HTMLAttributes<HTMLDivElement> {
    type: PurchaseTypes
    email: string;
    customerName: string;
    user: UserSession;
}

const BulkSubscription: FC<IProps> = ({ customerName, email, className, type, user, ...props }) => {

    if (type !== "bulk-subscription") {
        return <></> 
    }

    return (
        <div className={cn("", className)} {...props}>
            <WelcomeComponentGift 
                email={email}
                customerName={customerName} 
                type={type} 
                userDataId={(user?.userDataId || 0).toString()} />
         
        </div>
    )
}

export default BulkSubscription


// this should show once someone PURCHASES the bulk/gift sub. shown to the purchaser, not the reciever 