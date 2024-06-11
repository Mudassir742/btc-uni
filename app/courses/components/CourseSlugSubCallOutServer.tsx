import React from 'react';
import { getCurrentUserDataForCourseSlugPageAll, getCurrentUserDataPurchasedSubscriptions } from '../helper';
import { UserSession } from '@/interfaces';
import CourseSubCallOut from '@/components/CourseSubCallOut';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';

interface CourseSlugSubCallOutServerProps {
  user: UserSession | null;
}

const CourseSlugSubCallOutServer: React.FC<CourseSlugSubCallOutServerProps> = async ({user}) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;

    // const userDataAll = getCurrentUserDataForCourseSlugPageAll(user?.userDataId || 0);
    const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);

    // fetch user and downloadables in parellel
    const currentUserData = await userDataPurchasedSubscriptionsPromise;

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
    const userIsCurrentlySubscribed = checkSubIsValidSubscriptionObject(lastSubscription);

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
        <div>
          {!userIsCurrentlySubscribed && (<CourseSubCallOut /> )}
        </div>
    );
}

export default CourseSlugSubCallOutServer;