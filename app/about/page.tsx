
import Link from 'next/link';
import { getRequestCookie } from '@/components/auth/getAuthCookie';
import { cookies } from 'next/headers';
import { getHomePageDownloadablesAndTips, getUpcomingCourses } from "../helper";
import { getCurrentUserDataPurchasedSubscriptions } from '../courses/helper';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';


export default async function About() {

  const themeColor = "#523D34";
  const userProm = getRequestCookie(cookies());
  const user = await userProm;

  // check if user is logged in
  const isLoggedIn = (user?.userDataId || 0) > 0;

  const upcomingCoursesProm = getUpcomingCourses();
  const homeTipsAndDownloadablesProm = getHomePageDownloadablesAndTips("828880");
  const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);

  const [upcomingCourses, homeTipsAndDownloadables, userData] = await Promise.all([upcomingCoursesProm, homeTipsAndDownloadablesProm, userDataPromise]);

  const purchasedSubscriptions = userData?.userDataMetadata?.purchasedsubscriptions || [];
  // Sorting the array in descending order based on the subscription start date
  purchasedSubscriptions.sort((a, b) => {
    const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
    const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
    return dateA - dateB;  // Ascending order
  });
  // Now the last element in the sorted array is the most recent subscription
  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
  // TO DO NOW: check sub validity
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

  return (
    <main className=''>

      {/* <HomePageNotSignedIn upcomingCourses={upcomingCourses} themeColor={themeColor} tipsandDownloadables={homeTipsAndDownloadables} userDownloadableAccessLevel={userDownloadableAccessLevel}/>  */}

    </main>
  );
}
