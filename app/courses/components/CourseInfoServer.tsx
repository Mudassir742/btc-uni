import { Downloadable, UserSession } from "@/interfaces";
import React from "react";
import {
  extractCourseAll,
  extractCourseBasicsAndLevel,
  extractCourseBeforeAndAfter,
  extractCourseEducatorsAndTheirCourses,
  extractCourseHighlights,
  extractCoursePartOfSeries,
  extractCourseProductsUsed,
  extractCourseSubscriptionData,
  extractCourseTestimonials,
  extractCurrentUserDataForCourseSlugPageAll,
  getCourseAll,
  getCourseBasicsAndLevel,
  getCourseBeforeAndAfter,
  getCourseCategories,
  getCourseChapters,
  getCourseContent,
  getCourseEducatorsAndTheirCourses,
  getCourseEducatorsBasic,
  getCourseFormulas,
  getCourseHighlights,
  getCoursePartOfSeries,
  getCourseProductsUsed,
  getCourseSubscriptionData,
  getCourseTestimonials,
  getCourseYouWillLearn,
  getCurrentUserDataAccessedCoursesExtendedCourseHero,
  getCurrentUserDataForCourseSlugPageAll,
  getCurrentUserDataLikedCourses,
  getCurrentUserDataPurchasedBundles,
  getCurrentUserDataPurchasedCourses,
  getCurrentUserDataPurchasedSubscriptions,
  getUpcomingCourses,
  today,
} from "../helper";
import CourseInfo from "@/components/CourseInfo";
import ActionButtonPDFs from "@/components/buttons/ActionButtonPDFs";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import DownloadableCard from "@/components/DownloadableCard";

interface CourseInfoServerProps {
  params: { slug: string };
  user: UserSession | null;
  themeColor: string;
  trailerImage: string;
}

const CourseInfoServer: React.FC<CourseInfoServerProps> = async ({
  params,
  user,
  themeColor,
  trailerImage,
}) => {
  // check if user is logged in
  const isSignedIn = (user?.userDataId || 0) > 0;

  const userDataDatabaseId = user?.userDataId || 0;

  // const courseBasicsAndLevelProm = getCourseBasicsAndLevel(params);
  // const courseSubscriptionDataProm = getCourseSubscriptionData(params);
  // const courseCategoriesProm = getCourseCategories(params);
  // const coursePartOfSeriesProm = getCoursePartOfSeries(params);
  // const courseChaptersProm = getCourseChapters(params);
  // const courseDescriptionProm = getCourseContent(params);
  // const courseYouWillLearnProm = getCourseYouWillLearn(params);
  // const courseHighlightsProm = getCourseHighlights(params);
  // const courseBeforeAndAfterProm = getCourseBeforeAndAfter(params);
  // const courseTestimonialsProm = getCourseTestimonials(params);
  // const courseEducatorsAndTheirCoursesProm = getCourseEducatorsAndTheirCourses(params);
  // const courseProductsUsedProm = getCourseProductsUsed(params);
  const courseAllProm = getCourseAll(params);

  const userDataPurchasedSubscriptionsPromise =
    getCurrentUserDataPurchasedSubscriptions(userDataDatabaseId);
  const userDataPurchasedCoursesPromise =
    getCurrentUserDataPurchasedCourses(userDataDatabaseId); // doing no-store since dec30
  const userDataPurchasedBundlesPromise =
    getCurrentUserDataPurchasedBundles(userDataDatabaseId); // doing no-store since dec30
  // const userDataLikedCoursesProm = getCurrentUserDataLikedCourses(userDataDatabaseId);
  const userDataAccessedCoursesPromise =
    getCurrentUserDataAccessedCoursesExtendedCourseHero(userDataDatabaseId);
  // const userDataAllProm = getCurrentUserDataForCourseSlugPageAll(user?.userDataId || 0);

  // const upcomingCoursesProm = getUpcomingCourses();

  // fetch course chapters and user data in parallel
  const [
    courseAll,
    // userDataAll,
    userDataPurchasedSubscriptions, //instead of userDataAll since jan 15
    // userDataLikedCourses,
    userDataPurchasedCourses, // doing no-store since dec30
    userDataPurchasedBundles, // doing no-store since dec30
    accessedCourses,
    // upcomingCourses this was not being used as of jan 15
  ] = await Promise.all([
    courseAllProm,
    // userDataAllProm,
    userDataPurchasedSubscriptionsPromise,
    // userDataLikedCoursesProm,
    userDataPurchasedCoursesPromise, // doing no-store since dec30
    userDataPurchasedBundlesPromise, // doing no-store since dec30
    userDataAccessedCoursesPromise,
    // upcomingCoursesProm
  ]);

  // const { courseID, isPartOfSubscription, subscriptiontier, price } = extractCourseSubscriptionData(courseSubscriptionData);
  // const { isCoursePurchasableALaCarte, isCourseAvailableToBePurchasedOnlyALaCarte, live, theCourseTitle, level } = extractCourseBasicsAndLevel(courseBasicsAndLevel)

  // const { series } = extractCoursePartOfSeries(coursePartOfSeries);

  // const { newCourseHighlights } = extractCourseHighlights(courseHighlights);

  // const { beforeandafter } = extractCourseBeforeAndAfter(courseBeforeAndAfter);

  // const { courseTestimonialsNew } = extractCourseTestimonials(courseTestimonials);

  // const { courseEducatorsAndTheirCourses } = extractCourseEducatorsAndTheirCourses(educatorsAndTheirCourses);

  // const { usedProducts } = extractCourseProductsUsed(courseProductsUsed);

  const {
    courseID,
    isPartOfSubscription,
    subscriptiontier,
    price,
    isCoursePurchasableALaCarte,
    isCourseAvailableToBePurchasedOnlyALaCarte,
    live,
    theCourseTitle,
    level,
    series,
    newCourseHighlights,
    beforeandafter,
    courseTestimonialsNew,
    courseEducatorsAndTheirCourses,
    usedProducts,
    categories,
    courseDescription,
    youWillLearnText,
    theCourseChapters,
    downloadables,
  } = extractCourseAll(courseAll);
  // const { accessedCourses } = extractCurrentUserDataForCourseSlugPageAll(userDataAll)

  const isCourseFree = price === "0";

  const userDataDBId = userDataDatabaseId;

  // Users liked courses
  // const likedCourses = userDataLikedCourses?.userDataMetadata?.likedCourses || [];
  // whether or not the course is pinned --> to go in suspense
  // const pinned = likedCourses.some((course) => {
  //   const courseId = course.databaseId;
  //   return courseId === courseID;
  // });

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
  // const subscriptionStartsOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionstartson || "");
  // const subscriptionExpiresOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionexpireson || "");

  // // Check if subscription start date is today or one day before today
  // const isSubscriptionStartTodayOrBefore = subscriptionStartsOn <= today;
  // // Check if subscription expiration date is today or one day after today
  // const isSubscriptionExpireTodayOrAfter = subscriptionExpiresOn >= today;

  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(
    lastSubscription
  );

  // Checking if this course is part of accessed courses
  const isPartOfAccessedCourses = accessedCourses.some(
    (accessedcourse) =>
      accessedcourse.accessedcoursemetadata.courseid === courseID
  );
  const hasCompletedCourse = accessedCourses.some(
    (accessedcourse) =>
      accessedcourse.accessedcoursemetadata.courseid === courseID &&
      accessedcourse.isCompleted == true
  );

  // Get chapter if this course has already been viewed
  let startChapter: number;
  if (isPartOfAccessedCourses) {
    // If the user is part of accessed courses, find the endTime for the courseID
    const accessedCourse = accessedCourses.find(
      (accessedcourse) =>
        accessedcourse.accessedcoursemetadata.courseid === courseID
    );

    if (accessedCourse) {
      startChapter = accessedCourse.accessedcoursemetadata.endedAtChapter;
    } else {
      // Handle the case where the courseID is not found in accessed courses
      // You can set a default value or handle it as needed.
      startChapter = 1;
    }
  } else {
    // If the user is not part of accessed courses, set startTime to 0
    startChapter = 1;
  }

  // Get start time if this course has already been viewed
  let startTime: number = 0;
  if (isPartOfAccessedCourses) {
    // If the user is part of accessed courses, find the endTime for the courseID
    const accessedCourse = accessedCourses.find(
      (accessedcourse) =>
        accessedcourse.accessedcoursemetadata.courseid === courseID
    );

    if (accessedCourse) {
      startTime = accessedCourse?.accessedcoursemetadata?.endTime || 0;
    } else {
      // Handle the case where the courseID is not found in accessed courses
      // You can set a default value or handle it as needed.
      startTime = 0;
    }
  } else {
    // If the user is not part of accessed courses, set startTime to 0
    startTime = 0;
  }

  // Get databaseId of AccessedCourse in case it exists
  let accessedCourseDBId = 1;
  if (isPartOfAccessedCourses) {
    // If the user is part of accessed courses, find the endTime for the courseID
    const accessedCourse = accessedCourses.find(
      (accessedcourse) =>
        accessedcourse.accessedcoursemetadata.courseid === courseID
    );

    if (accessedCourse) {
      startTime = accessedCourse?.accessedcoursemetadata?.endTime || 0;
      accessedCourseDBId = accessedCourse.databaseId;
    } else {
      // Handle the case where the courseID is not found in accessed courses
      // You can set a default value or handle it as needed.
      startTime = 0;
    }
  } else {
    // If the user is not part of accessed courses, set startTime to 0
    startTime = 0;
  }

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
    return bundle?.coursebundlemetadata?.coursesinbundle.some(
      (course) => course.databaseId === courseID
    );
  });

  // Checking if the user can view the main content
  const userCanViewMainContent =
    isCourseFree === true ||
    (isSignedIn === true &&
      (isPartOfPurchasedCourses === true ||
        isPartOfPurchasedBundles === true ||
        (isPartOfSubscription === true &&
          // ((isSubscriptionStartTodayOrBefore === true && isSubscriptionExpireTodayOrAfter === true) &&
          //     subscriptiontier <= lastSubscription?.subscriptionMetadata?.subscriptiontype?.subscriptionTypeMetadata?.tier
          // )
          // TO DO AFTER LAUNCH: in the future we will need to check for tier as well if we implement tiers
          userIsCurrentlySubscribed === true)));

  const isCourseAvailableToBePurchasedALaCarte =
    isCoursePurchasableALaCarte === true && price !== "0" && price !== "";

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
  } else if (lastSubscriptionTypeID === 0 && isSignedIn) {
    userDownloadableAccessLevel = "free";
  }

  // create cards for downloadables
  // const createActionCards = (downloadables: Downloadable[] = [], userDownloadableAccessLevel: string) => (downloadables ?? []).map(
  //   (downloadable: Downloadable) => (
  //     <ActionButtonPDFs
  //       key={downloadable.databaseId}
  //       text={downloadable?.title || ""}
  //       link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
  //       description={downloadable?.content || ""}
  //       textColor={'black'}
  //       borderColor={'black'}
  //       // canDownload={userIsCurrentlySubscribed}
  //       downloadableAccessLevel={downloadable?.downloadablemetadata?.accessLevel}
  //       userDownloadableAccessLevel={userDownloadableAccessLevel}
  //       isPurchasableALaCarte={false} // only needed for individual courses, not categories
  //       isPurchasableOnlyALaCarte={false} // only needed for individual courses, not categories
  //       downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
  //       themecolor={themeColor}
  //     />
  //   )
  // );
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

  // fetch the user data once here, then pass the user data as props to other components that will load in suspense here

  return (
    <CourseInfo
      categories={categories}
      level={level}
      series={series}
      courseDescription={courseDescription}
      youWillLearnText={youWillLearnText}
      themeColor={themeColor}
      courseChapters={theCourseChapters}
      userCanViewMainContent={userCanViewMainContent}
      newCourseHighlights={newCourseHighlights}
      beforeandafter={beforeandafter}
      usedProducts={usedProducts}
      courseTestimonialsNew={courseTestimonialsNew}
      courseEducatorsAndTheirCourses={courseEducatorsAndTheirCourses}
      isCourseAvailableToBePurchasedOnlyALaCarte={
        isCourseAvailableToBePurchasedOnlyALaCarte
      }
      isCourseAvailableToBePurchasedALaCarte={
        isCourseAvailableToBePurchasedALaCarte
      }
      trailerImage={""}
      downloadableCards={downloadableCards}
      userDataId={userDataDBId}
      courseId={courseID}
      // isPinned={pinned}
      isSignedIn={isSignedIn}
    />
  );
};

export default CourseInfoServer;
