import React from 'react';
import TipParent from '@/components/TipParent';
import { UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import { getHomePageTips, getCurrentUserDataPurchasedSubscriptions, today } from '@/app/helper';
import SH1Text from '../text/SH1Text';
import ParagraphText from '../text/Paragraph';
import TipParentHomeUnsubscribed from '../TipParentHomeUnsubscribed';

interface TipsHomePageNotSignedInProps {
    user: UserSession | null;
}

const TipsHomePageNotSignedIn: React.FC<TipsHomePageNotSignedInProps> = async ({ user }) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;
    
    // const tipsCategoryDataPromise = getCategoryPageTips("433287");

    const homeTipsProm = getHomePageTips("828880");
    const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);

    // fetch user and downloadables in parellel
    const [tipsCategoryData, currentUserData] = await Promise.all([homeTipsProm, userDataPromise]);
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
    const tipVideos = tipsCategoryData ? tipsCategoryData?.tips || [] : [];

    return (
        <div>
            {tipVideos.length > 0 && (
                <div>
                  <div className='slider-container'>
                    <SH1Text
                      text="Favorite Quick Tips of the Week"
                      className=" text-themeColor"
                    />
                  </div>
                  {/* <ParagraphText
                    text="Quick Tips in less than 60 seconds"
                    className='text-secondarythemecolor slider-container'
                  /> */}
                  <div className="space-under-category-titles" />

                  {/* <Link href='/tips' className='flex flex-grow justify-end items-center mr-[6%]'>
                    <InputTextBold text='See All' />
                    <ChevronRight />
                  </Link> */}
                  <TipParentHomeUnsubscribed heroTitle={""} tipVideos={tipVideos} isSubscribed={userIsCurrentlySubscribed} userDataId={`${user?.userDataId || 0}`} />
            <div className='space-between-categories' />
          </div>
          
              )}
        </div>
    );
}

export default TipsHomePageNotSignedIn;