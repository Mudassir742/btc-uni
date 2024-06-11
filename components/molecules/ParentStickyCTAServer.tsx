import dynamic from 'next/dynamic'
import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { getRequestCookie } from '../auth/getAuthCookie';
import { cookies } from 'next/headers';
import ParentStickyCallToAction from '../ParentStickyCallToAction';
import { getCurrentUserDataPurchasedSubscriptions } from '@/app/courses/helper';
import { UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';

// Server Component:
const ServerComponent = dynamic(() => import('../ParentStickyCallToAction'))


interface IProps extends HTMLAttributes<HTMLDivElement> {
    // user: UserSession | null;
}

const ParentStickyCTAServer: FC<IProps> = async ({ className, ...props }) => {

    // fetch user cookie
    const userProm = getRequestCookie(cookies());
    const user = await userProm;
    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;
    // get UserData database id
    const userDataDatabaseId = user?.userDataId || 0;
    // get full UserData object
    const userDataPromise = getCurrentUserDataPurchasedSubscriptions(userDataDatabaseId);

    // fetch user and downloadables in parellel
    const currentUserData = await userDataPromise;
    // Convert subscription start and expiration dates to Date objects
    const purchasedSubscriptions = currentUserData?.userDataMetadata?.purchasedsubscriptions || [];
    // Sorting the array in descending order based on the subscription start date
    purchasedSubscriptions.sort((a, b) => {
      const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
      const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
      return dateA - dateB;  // Ascending order
    });
    // Now the last element in the sorted array is the most recent subscription
    const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
    const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

    // const subscriptionStartsOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionstartson || "");
    // const subscriptionExpiresOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionexpireson || "");
    // // Check if subscription start date is today or one day before today
    // const isSubscriptionStartTodayOrBefore = subscriptionStartsOn <= today;
    // // Check if subscription expiration date is today or one day after today
    // const isSubscriptionExpireTodayOrAfter = subscriptionExpiresOn >= today;
    // // Checking if the user is currently subscribed
    // const userIsCurrentlySubscribed = (
    //   (isLoggedIn === true) && (
    //     isSubscriptionStartTodayOrBefore === true &&
    //     isSubscriptionExpireTodayOrAfter === true
    //   )
    // )

    return (
        <div className={cn("", className)} {...props}>
            {!isLoggedIn ? (
                <ParentStickyCallToAction />
            ) : null}
        </div>
    )
}


export default ParentStickyCTAServer