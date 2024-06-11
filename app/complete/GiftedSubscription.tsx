import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { PurchaseTypes } from './page';
// Components
import SH1Text from '@/components/text/SH1Text'
import ParagraphText from '@/components/text/Paragraph'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import WelcomeComponentGift from '@/components/WelcomeComponentGift';
import WelcomeComponent from '@/components/WelcomeComponent';
import { UserSession } from '@/interfaces';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    user: UserSession;
    type: PurchaseTypes
    email: string;
    customerName: string;
}

const GiftedSubscription: FC<IProps> = ({ user, type, className, customerName, email, ...props }) => {
    if (type !== "gift-subscription") {
        return <></>
    }

    return (
        <div className={cn("", className)} {...props}>
            <WelcomeComponent email={email} customerName={customerName} />
            
            <WelcomeComponentGift 
                email={email} 
                customerName={customerName} 
                type={type} 
                userDataId={(user?.userDataId || 0).toString()} />
            
        </div>
    )
}

export default GiftedSubscription


// this should show once someone RECIEVES a gift subscription! not the person who purchases it.  they just need to see the normal welcome compoenent since they are the reciever