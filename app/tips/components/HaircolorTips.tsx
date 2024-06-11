import React from 'react';
import { getCategoryPageTips, getCurrentUserDataPurchasedSubscriptions, today } from '../helper';
import TipParent from '@/components/TipParent';
import { UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';

interface HaircolorTipsProps {
    user: UserSession | null;
    heroTitle: string;
}

const HaircolorTips: React.FC<HaircolorTipsProps> = async ({ user, heroTitle }) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;
    
    const tipsCategoryDataPromise = getCategoryPageTips("433285");
    const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);

    // fetch user and downloadables in parellel
    const [tipsCategoryData, currentUserData] = await Promise.all([tipsCategoryDataPromise, userDataPromise]);
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
    const tipVideos = tipsCategoryData ? tipsCategoryData?.newTips || [] : [];

    return (
        <div>
            {tipVideos.length > 0 && (
                <TipParent heroTitle={heroTitle} tipVideos={tipVideos} isSubscribed={userIsCurrentlySubscribed} userDataId={`${user?.userDataId || 0}`} />
            )}
        </div>
    );
}

export default HaircolorTips;