import { Downloadable, UserSession } from "@/interfaces";
import React from "react";
import {
  getCourseDownloadables,
  getCourseBasics,
  getCourseSubscriptionData,
  getCurrentUserDataPurchasedBundles,
  getCurrentUserDataPurchasedCourses,
  getCurrentUserDataPurchasedSubscriptions,
  extractCourseDownloadables,
  extractCourseSubscriptionData,
  extractCourseBasics,
  today,
  getCourseAll,
  extractCourseAll,
  getCurrentUserDataForCourseSlugPageAll,
} from "../helper";
import ActionButtonPDFs from "@/components/buttons/ActionButtonPDFs";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import H3Text from "@/components/text/H3Text";
import DownloadableCard from "@/components/DownloadableCard";
const themeColor = "#523D34";

interface CourseSlugDownloadablesProps {
  params: { slug: string };
  user: UserSession | null;
}

const CourseSlugDownloadables: React.FC<CourseSlugDownloadablesProps> = async ({
  params,
  user,
}) => {
  // check if user is logged in
  const isLoggedIn = (user?.userDataId || 0) > 0;

  // const courseDownloadablesProm = getCourseDownloadables(params);
  // const courseBasicsProm = getCourseBasics(params);
  // const courseSubscriptionDataProm = getCourseSubscriptionData(params);
  const courseAllProm = getCourseAll(params);

  const userDataPurchasedSubscriptionsPromise =
    getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
  const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCourses(
    user?.userDataId || 0
  ); // doing no-store since dec30
  const userDataPurchasedBundlesPromise = getCurrentUserDataPurchasedBundles(
    user?.userDataId || 0
  ); // doing no-store since dec30
  // const userDataAllProm = getCurrentUserDataForCourseSlugPageAll(user?.userDataId || 0);

  // fetch data in parallel
  const [
    courseAll,
    userDataPurchasedCourses, // doing no-store since dec30
    userDataPurchasedBundles, // doing no-store since dec30
    // userDataAll,
    userDataPurchasedSubscriptions,
  ] = await Promise.all([
    courseAllProm,
    userDataPurchasedCoursesPromise, // doing no-store since dec30
    userDataPurchasedBundlesPromise, // doing no-store since dec30
    // userDataAllProm,
    userDataPurchasedSubscriptionsPromise,
  ]);

  const {
    courseID,
    isPartOfSubscription,
    // subscriptiontier,
    price,
    // isCoursePurchasableALaCarte,
    // isCourseAvailableToBePurchasedOnlyALaCarte,
    downloadables,
  } = extractCourseAll(courseAll);
  // const { isCoursePurchasableALaCarte, isCourseAvailableToBePurchasedOnlyALaCarte } = extractCourseBasics(courseBasics)
  // const { downloadables } = extractCourseDownloadables(courseDownloadables);

  const isCourseFree = price === "0";

  // Convert subscription start and expiration dates to Date objects
  const purchasedSubscriptions =
    userDataPurchasedSubscriptions?.userDataMetadata.purchasedsubscriptions ||
    [];
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

  // Checking if this course is part of purchased courses
  // const purchasedCourses = userDataAll?.userDataMetadata?.purchasedcourses || [];
  const purchasedCourses =
    userDataPurchasedCourses?.userDataMetadata?.purchasedcourses || []; // doing no-store since dec30
  const isPartOfPurchasedCourses = purchasedCourses.some(
    (course) => course.databaseId === courseID
  );

  // Checking if this course is part of purchased bundles
  // const purchasedBundles = userDataAll?.userDataMetadata?.purchasedbundles || [];
  const purchasedBundles =
    userDataPurchasedBundles?.userDataMetadata?.purchasedbundless || []; // doing no-store since dec30
  const isPartOfPurchasedBundles = purchasedBundles.some((bundle) => {
    // Check if courseID matches any course inside the bundle
    return bundle.coursebundlemetadata.coursesinbundle.some(
      (course) => course.databaseId === courseID
    );
  });

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

  // create cards for downloadables
  // const createActionCards = (downloadables: Downloadable[] = [], userDownloadableAccessLevel: string) => (downloadables ?? []).map(
  //     (downloadable: Downloadable) => (
  //       <ActionButtonPDFs
  //         key={downloadable.databaseId}
  //         text={downloadable?.title || ""}
  //         link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
  //         description={downloadable?.content || ""}
  //         textColor={'black'}
  //         borderColor={'black'}
  //         // canDownload={userIsCurrentlySubscribed}
  //         downloadableAccessLevel={downloadable?.downloadablemetadata?.accessLevel}
  //         userDownloadableAccessLevel={userDownloadableAccessLevel}
  //         isPurchasableALaCarte={false} // only needed for individual courses, not categories
  //         isPurchasableOnlyALaCarte={false} // only needed for individual courses, not categories
  //         downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
  //         themecolor={themeColor}
  //       />
  //     )
  //   );
  // above deprecared by mihai on feb 7 2024 and replaced with link action cards that take to the downloadables page
  const createActionCards = (downloadables: Downloadable[] = []) =>
    (downloadables ?? []).map((downloadable: Downloadable) => (
      <DownloadableCard
        key={downloadable.databaseId}
        slug={downloadable.slug}
        text={downloadable?.title || ""}
        link={
          downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl ||
          ""
        }
        description={downloadable?.content || ""}
        // canDownload={userIsCurrentlySubscribed}
        downloadImage={
          downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl ||
          ""
        }
        themecolor={themeColor}
      />
    ));

  const downloadableCards = createActionCards(
    downloadables,
    // userDownloadableAccessLevel
  );

  return (
    <div>
      {downloadables.length > 0 && (
        <div className="downloadables">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="container md:px-0 flex items-center">
                <H3Text text="Course Resources" />
              </div>
            </div>
            <div className="md:flex slider-container md:px-0">
              {downloadableCards}
            </div>
          </div>
          <div className="w-full h-[1px] bg-white my-8"></div>
          <div className="space-between-categories" />
        </div>
      )}
    </div>
  );
};

export default CourseSlugDownloadables;
