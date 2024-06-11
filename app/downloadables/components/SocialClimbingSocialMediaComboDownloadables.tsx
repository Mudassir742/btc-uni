import React from 'react';
import { Section, createActionCards, getCategoryPageDownloadablesSocialClimbingSocialMedia, getCategoryPageTips, getCurrentUserDataPurchasedSubscriptions, today } from '../helper';
import TipParent from '@/components/TipParent';
import { UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';

interface SocialClimbingSocialMediaComboDownloadablesProps {
    user: UserSession | null;
    heroTitle: string;
}

const SocialClimbingSocialMediaComboDownloadables: React.FC<SocialClimbingSocialMediaComboDownloadablesProps> = async ({ user, heroTitle }) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;
    
    const socialClimbingSocialMediaDownloadablesDataPromise = getCategoryPageDownloadablesSocialClimbingSocialMedia("884081"); // updated type of objects and page id jan 18
    const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);

    // fetch user and downloadables in parellel
    const [categoryDownloadables, currentUserData] = await Promise.all([socialClimbingSocialMediaDownloadablesDataPromise, userDataPromise]);
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

    const lastSubscriptionTypeID = lastSubscription?.subscriptionMetadata?.subscriptiontype?.databaseId || 0;
    const upcomingSubscriptionTypeID = Number(lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid || "" === "" ? "0" : lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid);
  
    let userDownloadableAccessLevel = "nr";
    
    if (lastSubscriptionTypeID === 229341 || upcomingSubscriptionTypeID === 229341) {
      userDownloadableAccessLevel = "free";
    }
    else if  ((userIsCurrentlySubscribed && lastSubscriptionTypeID === 229342) || upcomingSubscriptionTypeID === 229342) {
      userDownloadableAccessLevel = "monthly";
    }
    else if  ((userIsCurrentlySubscribed && lastSubscriptionTypeID === 229343) || upcomingSubscriptionTypeID === 229343) {
      userDownloadableAccessLevel = "biannualy";
    }
    else if  ((userIsCurrentlySubscribed && lastSubscriptionTypeID === 229344) || upcomingSubscriptionTypeID === 229344) {
      userDownloadableAccessLevel = "annualy";
    }
    else if (lastSubscriptionTypeID === 0 && isLoggedIn) {
        userDownloadableAccessLevel = "free";
    }

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
    const downloadableCards = createActionCards(categoryDownloadables, 
      // userDownloadableAccessLevel
      );

    return (
        <div>
          {categoryDownloadables.length > 0 && (
          <div id="Downloadables-SocialClimbingSocialMedia-section">
            <Section title={`${heroTitle} Resources`} cards={downloadableCards} />
          </div>
        )}
        </div>
    );
}

export default SocialClimbingSocialMediaComboDownloadables;