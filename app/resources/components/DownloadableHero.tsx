import React from "react";
import {
    extractDownloadableAll,
  getCurrentUserDataPurchasedSubscriptions,
  getDownloadableAll,
  getUserGAData,
} from "../helper";
import { UserSession } from "@/interfaces";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import DownloadableHeroInner from "@/components/DownloadableHeroInner";

interface DownloadableHeroProps {
  params: { slug: string };
  user: UserSession | null;
}

const DownloadableHero: React.FC<DownloadableHeroProps> = async ({ params, user }) => {

  const isPurchasableALaCarte=false; // only needed for individual courses, not categories or downloadable slug page
  const isPurchasableOnlyALaCarte=false; // only needed for individual courses, not categories or downloadable slug page

  // check if user is logged in
  const isLoggedIn = (user?.userDataId || 0) > 0;

//   const downloadableCategoryDataPromise =
//     getCategoryPageDownloadables("433285");

  const downloadableAllProm = getDownloadableAll(params);

  const userDataPromise = getCurrentUserDataPurchasedSubscriptions(
    user?.userDataId || 0
  );

  const userDataGADataPromise = getUserGAData(user?.userDataId || 0);

  // fetch user and downloadables in parellel
  const [downloadableData, currentUserData, userDataGAData] = await Promise.all([
    downloadableAllProm,
    userDataPromise,
    userDataGADataPromise
  ]);
  // Convert subscription start and expiration dates to Date objects
  const purchasedSubscriptions =
    currentUserData?.userDataMetadata?.purchasedsubscriptions || [];
  // Sorting the array in descending order based on the subscription start date
  purchasedSubscriptions.sort((a, b) => {
    const dateA = new Date(
      a.subscriptionMetadata.subscriptionstartson
    ).getTime();
    const dateB = new Date(
      b.subscriptionMetadata.subscriptionstartson
    ).getTime();
    return dateA - dateB; // Ascending order
  });
  // Now the last element in the sorted array is the most recent subscription
  const lastSubscription =
    purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(
    lastSubscription
  );

  const lastSubscriptionTypeID =
    lastSubscription?.subscriptionMetadata?.subscriptiontype?.databaseId || 0;
  const upcomingSubscriptionTypeID = Number(
    lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid || "" === ""
      ? "0"
      : lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid
  );

  let userDownloadableAccessLevel = "nr";

  if (
    lastSubscriptionTypeID === 229341 ||
    upcomingSubscriptionTypeID === 229341
  ) {
    userDownloadableAccessLevel = "free";
  } else if (
    (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229342) ||
    upcomingSubscriptionTypeID === 229342
  ) {
    userDownloadableAccessLevel = "monthly";
  } else if (
    (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229343) ||
    upcomingSubscriptionTypeID === 229343
  ) {
    userDownloadableAccessLevel = "biannualy";
  } else if (
    (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229344) ||
    upcomingSubscriptionTypeID === 229344
  ) {
    userDownloadableAccessLevel = "annualy";
  } else if (lastSubscriptionTypeID === 0 && isLoggedIn) {
    userDownloadableAccessLevel = "free";
  }

  const {
    title,
    content,
    databaseId,
    downloadableVerticalPicture,
    downloadableHorizontalPicture,
    downloadableFile,
    downloadableAccessLevel,
  } = extractDownloadableAll(downloadableData)


  return (
    <DownloadableHeroInner 
      isPurchasableALaCarte={isPurchasableALaCarte}
      isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
      isLoggedIn={isLoggedIn}
      downloadableAccessLevel={downloadableAccessLevel}
      userDownloadableAccessLevel={userDownloadableAccessLevel}
      downloadableFile={downloadableFile}
      title={title}
      content={content}
      downloadableHorizontalPicture={downloadableHorizontalPicture}
      downloadableVerticalPicture={downloadableVerticalPicture}
      userId={userDataGAData?.userDataMetadata?.userid || ""}
      userDataId={(user?.userDataId || 0).toString()}
      userState={userDataGAData?.userDataMetadata?.state || ""}
      userCity={userDataGAData?.userDataMetadata?.city || ""}
      userCountry={userDataGAData?.userDataMetadata?.country || ""}
      userZip={userDataGAData?.userDataMetadata?.zipcode || ""}
      downloadableId={databaseId.toString()}
      youWillLearn={""}
    />
  );
};

export default DownloadableHero;
